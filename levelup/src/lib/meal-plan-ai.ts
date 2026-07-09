import type { MacroTargets, SuggestedMeal } from './types';

export interface MealPlan {
  meals: SuggestedMeal[];
  groceryList: string[];
}

export async function generateMealPlan(
  goal: string,
  mode: 'Cut' | 'Maintain' | 'Bulk',
  macroTargets: MacroTargets,
): Promise<MealPlan> {
  const res = await fetch('/api/meal-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goal, mode, macroTargets }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `Request failed (${res.status})`);
  return { meals: json.meals as SuggestedMeal[], groceryList: json.groceryList as string[] };
}
