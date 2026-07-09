import type { AppState } from '@/state/app-context';
import { MACRO_TARGETS } from './data';

/**
 * Builds the coach's request from real app state — no canned data.
 * `latestText` is appended explicitly since `state.chat` is a pre-dispatch
 * snapshot and won't yet include the message the user just sent.
 */
export async function getCoachReply(state: AppState, macroTotals: Record<string, number>, latestText: string): Promise<string> {
  // Anthropic requires the message list to start with a 'user' turn — drop
  // the leading onboarding greeting (always from the coach) before mapping.
  const chat = state.chat[0]?.from === 'coach' ? state.chat.slice(1) : state.chat;
  const messages = [
    ...chat.slice(-12).map((m) => ({
      role: (m.from === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
      text: m.text,
    })),
    { role: 'user' as const, text: latestText },
  ];

  const res = await fetch('/api/coach-reply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personality: state.profile.coachPersonality,
      name: state.profile.name,
      goal: state.profile.goal,
      level: state.level,
      currentStreak: state.currentStreak,
      stats: state.stats,
      macros: { targets: MACRO_TARGETS, totals: macroTotals },
      quests: state.quests.map((q) => ({ title: q.title, done: q.done, progress: q.progress, target: q.target, unit: q.unit })),
      habits: state.habits.map((h) => ({ title: h.title, doneToday: h.doneToday, streak: h.streak })),
      messages,
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `Request failed (${res.status})`);
  return json.reply as string;
}
