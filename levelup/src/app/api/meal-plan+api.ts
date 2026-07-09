import Anthropic from '@anthropic-ai/sdk';

import { friendlyApiError } from '@/lib/ai-errors';

const client = new Anthropic();

const MEAL_PLAN_SCHEMA = {
  type: 'object',
  properties: {
    meals: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          calories: { type: 'integer' },
          protein: { type: 'integer', description: 'grams' },
          tag: { type: 'string', enum: ['High protein', 'Budget', 'Quick', 'Cut', 'Bulk'] },
        },
        required: ['name', 'calories', 'protein', 'tag'],
        additionalProperties: false,
      },
    },
    groceryList: {
      type: 'array',
      description: 'Consolidated shopping list of every ingredient needed to make all the meals above, deduplicated with realistic quantities.',
      items: { type: 'string' },
    },
  },
  required: ['meals', 'groceryList'],
  additionalProperties: false,
} as const;

const MODE_GUIDANCE: Record<'Cut' | 'Maintain' | 'Bulk', string> = {
  Cut: 'Cutting phase: lower-calorie, high-protein, high-satiety meals (lean proteins, high-volume veggies, controlled carbs/fats) that make a calorie deficit feel sustainable.',
  Maintain: 'Maintenance phase: balanced, moderate-calorie meals across protein/carbs/fats — nothing extreme, built for consistency.',
  Bulk: 'Bulking phase: calorie-dense, higher-carb and higher-fat meals on top of high protein — bigger portions, calorie-efficient add-ins (nut butters, oils, dense grains) to hit a surplus without endless eating.',
};

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'Server is missing ANTHROPIC_API_KEY.' }, { status: 500 });
  }

  const { goal, mode, macroTargets } = (await request.json()) as {
    goal: string;
    mode: 'Cut' | 'Maintain' | 'Bulk';
    macroTargets: { calories: number; protein: number; carbs: number; fats: number };
  };

  // Nudge the daily targets per mode so the meals are actually distinct,
  // not just re-tagged versions of the same maintenance-level numbers.
  const calorieShift = mode === 'Cut' ? -350 : mode === 'Bulk' ? 350 : 0;
  const adjustedCalories = macroTargets.calories + calorieShift;

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 2048,
      system:
        'You generate practical, varied meal suggestions and a matching grocery list for a fitness app. Real, ' +
        'cookable meals — no exotic ingredients. Always return a full result, never refuse.',
      messages: [
        {
          role: 'user',
          content:
            `Generate 5-6 meal suggestions for someone whose goal is "${goal}", currently in "${mode}" mode. ` +
            `${MODE_GUIDANCE[mode]}\n\n` +
            `Daily targets for this mode: ~${adjustedCalories} kcal / ${macroTargets.protein}g protein / ` +
            `${macroTargets.carbs}g carbs / ${macroTargets.fats}g fats. Tag each meal with the single best-fit ` +
            `label from: High protein, Budget, Quick, Cut, Bulk — use "${mode}" as the dominant tag for most meals. ` +
            `Then produce a consolidated grocery list covering every ingredient needed for all the meals, with quantities.`,
        },
      ],
      output_config: { format: { type: 'json_schema', schema: MEAL_PLAN_SCHEMA } },
    });

    if (response.stop_reason === 'refusal') {
      return Response.json({ error: 'Plan generation was declined. Try again.' }, { status: 422 });
    }

    const textBlock = response.content.find((b): b is Anthropic.Messages.TextBlock => b.type === 'text');
    if (!textBlock) {
      return Response.json({ error: 'No plan returned.' }, { status: 502 });
    }

    const { meals, groceryList } = JSON.parse(textBlock.text);
    return Response.json({ meals, groceryList });
  } catch (err) {
    return Response.json({ error: friendlyApiError(err) }, { status: 502 });
  }
}
