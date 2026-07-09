import Anthropic from '@anthropic-ai/sdk';

import { friendlyApiError } from '@/lib/ai-errors';

const client = new Anthropic();

const PERSONALITY_VOICE: Record<string, string> = {
  Supportive: 'Warm, encouraging, patient. Celebrates progress. Never guilt-trips.',
  'Tough love': 'Blunt, no-nonsense, holds high standards. Calls out excuses, but never cruel.',
  Military: 'Terse, orders-and-execution tone. Short sentences. Mission language.',
  'Big brother': 'Direct but caring, like an older sibling who’s been there. Casual, real talk.',
  'Calm mentor': 'Measured, reflective, wisdom-forward. Speaks in principles, stays unhurried.',
};

interface CoachRequestBody {
  personality: string;
  name: string;
  goal: string;
  level: number;
  currentStreak: number;
  stats: Record<string, number>;
  macros: { targets: Record<string, number>; totals: Record<string, number> };
  quests: { title: string; done: boolean; progress?: number; target?: number; unit?: string }[];
  habits: { title: string; doneToday: boolean; streak: number }[];
  messages: { role: 'user' | 'assistant'; text: string }[];
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'Server is missing ANTHROPIC_API_KEY.' }, { status: 500 });
  }

  const body = (await request.json()) as CoachRequestBody;
  const { personality, name, goal, level, currentStreak, stats, macros, quests, habits, messages } = body;

  const questLines = quests
    .map((q) => `- ${q.title}: ${q.done ? 'done' : q.target ? `${q.progress ?? 0}/${q.target}${q.unit ?? ''}` : 'not done'}`)
    .join('\n');
  const habitLines = habits.map((h) => `- ${h.title}: ${h.doneToday ? 'done today' : 'not done today'}, streak ${h.streak}`).join('\n');
  const statLines = Object.entries(stats)
    .map(([k, v]) => `${k} ${v}`)
    .join(', ');

  const systemPrompt =
    `You are ${name}'s personal fitness/life coach inside the LevelUp app. Voice: ${PERSONALITY_VOICE[personality] ?? PERSONALITY_VOICE.Supportive}\n\n` +
    `You can see ${name}'s real, current data — use it specifically, never generically:\n` +
    `- Main goal: ${goal}\n` +
    `- Level ${level}, current streak ${currentStreak} days\n` +
    `- Character stats: ${statLines}\n` +
    `- Today's quests:\n${questLines}\n` +
    `- Habits:\n${habitLines}\n` +
    `- Macros today: ${macros.totals.calories}/${macros.targets.calories} kcal, ${macros.totals.protein}/${macros.targets.protein}g protein, ` +
    `${macros.totals.carbs}/${macros.targets.carbs}g carbs, ${macros.totals.fats}/${macros.targets.fats}g fats\n\n` +
    `Answer the actual question asked, specifically, using this real data. Give concrete, actionable advice — ` +
    `never a generic "stay consistent" non-answer. Keep replies conversational, 2-4 sentences unless the question ` +
    `genuinely needs more (e.g. a workout adjustment with specifics). Stay in the personality voice throughout.`;

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.text })),
    });

    if (response.stop_reason === 'refusal') {
      return Response.json({ reply: "I can't help with that one — ask me something about your training, nutrition, or progress." });
    }

    const textBlock = response.content.find((b): b is Anthropic.Messages.TextBlock => b.type === 'text');
    return Response.json({ reply: textBlock?.text ?? "Didn't quite catch that — try asking again." });
  } catch (err) {
    return Response.json({ error: friendlyApiError(err) }, { status: 502 });
  }
}
