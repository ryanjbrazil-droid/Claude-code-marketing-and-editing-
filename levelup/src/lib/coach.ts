import type { CoachPersonality } from './types';

/**
 * Mock AI coach. Deterministic, personality-flavored responses so the app
 * feels alive without a real AI API. Swap `coachReply` for a real model call later.
 */

export const QUICK_PROMPTS = [
  'Adjust my workout',
  'What should I eat?',
  'Motivate me',
  'Review my week',
  'Make today easier',
  'Push me harder',
] as const;

export type QuickPrompt = (typeof QUICK_PROMPTS)[number];

export function coachGreeting(personality: CoachPersonality, name: string): string {
  switch (personality) {
    case 'Supportive':
      return `Good morning, ${name}. Your streak is alive and that matters. Yesterday's nutrition slipped a bit — no guilt, just focus. Today: workout, protein, water. You've got this.`;
    case 'Tough love':
      return `Morning. Streak's alive, but yesterday's nutrition was weak and you know it. No excuses today — workout, protein, water. Win those three or don't bother telling me about it.`;
    case 'Military':
      return `${name}. Status report: streak intact, nutrition below standard. Today's orders: complete the training session, hit protein, hit water. Execute. No deviation.`;
    case 'Big brother':
      return `Good morning. Your streak is alive, but yesterday's nutrition was weak. Today we simplify: hit your workout, protein, and water. Win those three and the day is yours.`;
    case 'Calm mentor':
      return `Good morning, ${name}. Notice the streak you've built — it's proof of who you're becoming. Yesterday's nutrition drifted. Today, return to basics: train, eat with intention, hydrate.`;
  }
}

export function todayFocus(personality: CoachPersonality): string {
  switch (personality) {
    case 'Supportive':
      return 'You missed protein yesterday, but your workout streak is strong. Today’s focus is simple: train hard, hit protein, and protect the streak.';
    case 'Tough love':
      return 'Protein was a miss yesterday. Streak’s strong — don’t let food be the thing that breaks you. Train hard, eat right, protect the streak.';
    case 'Military':
      return 'Yesterday: protein target missed. Workout streak: strong. Today’s mission — train hard, hit protein, protect the streak. Nothing else matters.';
    case 'Big brother':
      return 'You missed protein yesterday, but your workout streak is strong. Today’s focus is simple: train hard, hit protein, and protect the streak.';
    case 'Calm mentor':
      return 'Protein slipped yesterday; the streak did not. Keep today simple — train with intent, feed the machine, protect what you’ve built.';
  }
}

const REPLIES: Record<QuickPrompt, Record<CoachPersonality, string>> = {
  'Adjust my workout': {
    Supportive: "Let's tune it. Your readiness is solid, so keep bench as the anchor. If your shoulder felt tight last session, swap cable fly for pec deck and drop lateral raises to 3 sets. Quality over volume today.",
    'Tough love': "Adjust? Fine. Keep the heavy bench — that's non-negotiable. Swap cable fly for pec deck if the shoulder's cranky, but you're not cutting volume because it's hard. It's supposed to be hard.",
    Military: 'Adjustment approved. Bench press remains primary. Substitute cable fly with pec deck. Reduce lateral raise to 3 sets. All other movements unchanged. Execute as written.',
    'Big brother': "Here's the move: keep bench heavy since readiness is at 82%. If anything, swap cable fly for pec deck and save your shoulder. Don't cut the pushdowns — your triceps are lagging and you know it.",
    'Calm mentor': "Listen to the body, not the mood. Readiness says you can push. Keep the bench, trade cable fly for pec deck if the shoulder whispers, and leave the session feeling strong — not destroyed.",
  },
  'What should I eat?': {
    Supportive: "You're 48g short on protein with about 450 calories left. A chicken rice bowl or Greek yogurt with a scoop of whey gets you there. You're closer than you think!",
    'Tough love': "You're 48g of protein short. That's two real meals' worth. Chicken and rice tonight, yogurt and whey before bed. Eat like someone who wants the result.",
    Military: 'Remaining targets: 48g protein, ~450 kcal. Ration plan: 8 oz chicken breast, 1 cup rice, greens. Before sleep: casein or Greek yogurt. Comply.',
    'Big brother': "You've got 450 calories and 48g protein left. Easy play: salmon and potatoes for dinner, Greek yogurt before bed. Done. Don't overthink it.",
    'Calm mentor': 'The gap is 48g of protein. Choose the simple path: a real dinner built around meat, then yogurt in the evening. Consistency beats perfection.',
  },
  'Motivate me': {
    Supportive: "Look at what you've already built — a 26-day streak, 50 workouts, real strength gains. That wasn't luck. That was you, showing up. Today is just one more brick.",
    'Tough love': "You don't need motivation, you need to remember who you said you'd become. 26 days of proof says you can. The version of you that quits today doesn't deserve the last 26.",
    Military: '26 consecutive days of execution. 50 completed sessions. You are not the person who started. Motivation is irrelevant — discipline is the mission. Move.',
    'Big brother': "26 days, man. You've never strung together 26 days of anything before this. Don't romanticize it — just go do today's work and keep the machine running.",
    'Calm mentor': 'Motivation fades by design; identity does not. You are someone who trains, reads, and keeps promises to himself. Act like him for one more day — that is all today asks.',
  },
  'Review my week': {
    Supportive: "Strong week overall: 4 of 5 workouts done, water goal 6 of 7 days, and weight trending down 0.8 lb. Protein was the weak spot — missed 3 days. Let's pre-plan dinners this week.",
    'Tough love': "4 of 5 workouts — acceptable. Protein missed 3 of 7 days — not acceptable. Weight's moving because training carried you. Fix the food or the progress stalls. Simple.",
    Military: 'Weekly debrief: workouts 4/5. Water 6/7. Sleep target 4/7. Protein 4/7 — primary deficiency. Corrective action: meals planned the night prior. Dismissed.',
    'Big brother': "Solid week: 4 workouts, weight down 0.8, water almost perfect. But protein missed 3 days and sleep slipped twice. This week, dinner gets planned at lunch. That one habit fixes both.",
    'Calm mentor': 'The week tells a story: training is now who you are; nutrition is still a negotiation. 4 of 5 sessions, 0.8 lb down. This week, decide dinner before you are hungry.',
  },
  'Make today easier': {
    Supportive: "Of course — hard days happen. Minimum viable day: 20-minute workout, hit protein, 80 oz water. Everything else is bonus. Protect the streak, that's the only rule.",
    'Tough love': "Easier, huh. Fine — we shrink it, we don't skip it. 20 hard minutes, protein, water. The streak survives. But tomorrow you pay it back with interest.",
    Military: 'Reduced operations approved. Minimum standard: 20-minute session, protein target, 80 oz water. Streak preservation is the objective. Anything less is failure.',
    'Big brother': "Alright, real talk — shrink the day, don't skip it. 20-minute session, protein, water. That's the whole list. The streak lives, and tomorrow we go again at full speed.",
    'Calm mentor': 'On heavy days, lower the bar — never to zero. Twenty minutes of movement, protein, water. Small, done, kept. The streak is the promise; keep the promise small enough to keep.',
  },
  'Push me harder': {
    Supportive: "I love this energy! Okay: add a top set at 190 on bench, finish with a 10-minute incline walk, and get 110 oz of water. Full send — you've earned the right to push.",
    'Tough love': "Now we're talking. Bench top set at 190. Add two burnout sets on pushdowns. 12k steps, not 10. And lights out at 10:15, not 10:30. Prove it wasn't just talk.",
    Military: 'Elevated intensity authorized. Bench: add top set at 190 lb. Steps target raised to 12,000. Water raised to 110 oz. Sleep by 22:15. Report completion.',
    'Big brother': "Good. Top set at 190 on bench today — you've got it in you. 12k steps instead of 10. And read 20 pages, not 10. Tonight you'll know you emptied the tank.",
    'Calm mentor': 'Intensity with intention: one heavier top set on bench, two extra thousand steps, twenty pages instead of ten. Push the edges, keep the form. Growth lives just past comfortable.',
  },
};

export function coachReply(prompt: string, personality: CoachPersonality): string {
  const known = REPLIES[prompt as QuickPrompt];
  if (known) return known[personality];

  // Freeform fallback, flavored by personality.
  switch (personality) {
    case 'Supportive':
      return "I hear you. Whatever's on your mind, the plan stays simple: train, eat, hydrate, sleep. Tell me which one feels hardest today and we'll make it easier together.";
    case 'Tough love':
      return "Less talking, more doing. The plan is on your Today screen. Pick the next quest and finish it — then come back and tell me it's done.";
    case 'Military':
      return 'Understood. Refer to today’s quest list. Execute the next incomplete objective. Report back on completion.';
    case 'Big brother':
      return "Got it. Look — the day only has a few battles that matter: workout, protein, water, sleep. Knock out the next one on your list and check back in.";
    case 'Calm mentor':
      return 'Noted. When in doubt, return to the fundamentals: move, nourish, hydrate, rest. Choose the next smallest action and take it.';
  }
}
