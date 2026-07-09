import type { CoachPersonality } from './types';

export const QUICK_PROMPTS = [
  'Adjust my workout',
  'What should I eat?',
  'Motivate me',
  'Review my week',
  'Make today easier',
  'Push me harder',
] as const;

export interface TodayFocusContext {
  questsDone: number;
  questsTotal: number;
  nextQuestTitle: string | null;
  currentStreak: number;
}

/** Honest, state-driven — never references a fabricated "yesterday". */
export function todayFocus(personality: CoachPersonality, ctx: TodayFocusContext): string {
  const allDone = ctx.questsTotal > 0 && ctx.questsDone === ctx.questsTotal;
  const freshStart = ctx.currentStreak === 0 && ctx.questsDone === 0;
  const next = ctx.nextQuestTitle ?? 'your next quest';

  if (allDone) {
    switch (personality) {
      case 'Supportive':
        return `Every quest done today — that's a full day protected. Your streak is at ${ctx.currentStreak}. Enjoy this one.`;
      case 'Tough love':
        return `All ${ctx.questsTotal} done. That's the standard, not a favor to yourself. Streak's at ${ctx.currentStreak} — keep it that way tomorrow.`;
      case 'Military':
        return `Status: all ${ctx.questsTotal} objectives complete. Streak: ${ctx.currentStreak} days. Stand down. Repeat tomorrow.`;
      case 'Big brother':
        return `You cleared everything today, man. Streak's at ${ctx.currentStreak}. That's how you build something real.`;
      case 'Calm mentor':
        return `Today is complete — all of it. The streak sits at ${ctx.currentStreak}. Notice how that feels; return to it tomorrow.`;
    }
  }

  if (freshStart) {
    switch (personality) {
      case 'Supportive':
        return `Day one — nothing's been proven yet, and that's exactly the point. Start with ${next}. Everything after this is momentum.`;
      case 'Tough love':
        return `Zero history. Zero excuses. First move: ${next}. That's how a streak starts — not by thinking about it.`;
      case 'Military':
        return `No prior data on record. First objective: ${next}. Execute. The streak begins the moment you do.`;
      case 'Big brother':
        return `Fresh start, no pressure from the past — just today. Knock out ${next} first and you're already building something.`;
      case 'Calm mentor':
        return `There is no history yet, only the choice in front of you. Begin with ${next}. The pattern starts with one action, not many.`;
    }
  }

  switch (personality) {
    case 'Supportive':
      return `${ctx.questsDone} of ${ctx.questsTotal} quests done today, streak at ${ctx.currentStreak}. Next up: ${next} — you're closer than it feels.`;
    case 'Tough love':
      return `${ctx.questsDone}/${ctx.questsTotal} done. Streak's ${ctx.currentStreak} days — don't let it slip now. Get ${next} done next.`;
    case 'Military':
      return `Progress: ${ctx.questsDone} of ${ctx.questsTotal} objectives complete. Streak: ${ctx.currentStreak} days. Next order: ${next}.`;
    case 'Big brother':
      return `${ctx.questsDone} of ${ctx.questsTotal} down today, streak at ${ctx.currentStreak}. Go handle ${next} next.`;
    case 'Calm mentor':
      return `${ctx.questsDone} of ${ctx.questsTotal} complete, streak at ${ctx.currentStreak} days. The next right action is ${next}.`;
  }
}
