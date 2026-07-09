export interface NutritionEstimate {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  confidence: 'low' | 'medium' | 'high';
}

async function callEstimate(body: Record<string, unknown>): Promise<NutritionEstimate> {
  const res = await fetch('/api/nutrition-estimate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `Request failed (${res.status})`);
  return json.estimate as NutritionEstimate;
}

export function estimateFromText(text: string): Promise<NutritionEstimate> {
  return callEstimate({ mode: 'text', text });
}

export function estimateFromImage(imageBase64: string, mediaType: string): Promise<NutritionEstimate> {
  return callEstimate({ mode: 'image', imageBase64, mediaType });
}
