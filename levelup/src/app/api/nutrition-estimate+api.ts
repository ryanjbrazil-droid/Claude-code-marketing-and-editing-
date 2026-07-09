import Anthropic from '@anthropic-ai/sdk';

import { friendlyApiError } from '@/lib/ai-errors';

/**
 * Server-only route (Expo Router +api.ts). ANTHROPIC_API_KEY never reaches
 * the client bundle — only code imported from client files gets bundled.
 */
const client = new Anthropic();

const NUTRITION_SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string', description: 'Short name of the meal/food' },
    calories: { type: 'integer' },
    protein: { type: 'integer', description: 'grams' },
    carbs: { type: 'integer', description: 'grams' },
    fats: { type: 'integer', description: 'grams' },
    confidence: { type: 'string', enum: ['low', 'medium', 'high'] },
  },
  required: ['name', 'calories', 'protein', 'carbs', 'fats', 'confidence'],
  additionalProperties: false,
} as const;

const SYSTEM_PROMPT =
  'You are a nutrition estimation assistant embedded in a fitness app. Given a description or photo ' +
  'of a meal, estimate its name and nutrition (calories, protein, carbs, fats in grams) as accurately ' +
  'as you can from typical serving sizes. Always return a best-effort estimate — never refuse or ask ' +
  'clarifying questions. If multiple foods are described, sum their totals into one entry.';

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'Server is missing ANTHROPIC_API_KEY.' }, { status: 500 });
  }

  const body = await request.json();
  const { mode, text, imageBase64, mediaType } = body as {
    mode: 'text' | 'image';
    text?: string;
    imageBase64?: string;
    mediaType?: string;
  };

  const content: Anthropic.Messages.ContentBlockParam[] =
    mode === 'image'
      ? [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: (mediaType ?? 'image/jpeg') as 'image/jpeg' | 'image/png',
              data: imageBase64 ?? '',
            },
          },
          { type: 'text', text: 'Estimate the nutrition for the meal in this photo.' },
        ]
      : [{ type: 'text', text: `Estimate the nutrition for this meal, described by the user: "${text ?? ''}"` }];

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content }],
      output_config: { format: { type: 'json_schema', schema: NUTRITION_SCHEMA } },
    });

    if (response.stop_reason === 'refusal') {
      return Response.json({ error: 'The estimate was declined. Try describing the meal differently.' }, { status: 422 });
    }

    const textBlock = response.content.find((b): b is Anthropic.Messages.TextBlock => b.type === 'text');
    if (!textBlock) {
      return Response.json({ error: 'No estimate returned.' }, { status: 502 });
    }

    const estimate = JSON.parse(textBlock.text);
    return Response.json({ estimate });
  } catch (err) {
    return Response.json({ error: friendlyApiError(err) }, { status: 502 });
  }
}
