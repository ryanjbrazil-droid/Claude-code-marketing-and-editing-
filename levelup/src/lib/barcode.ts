export interface BarcodeProduct {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  /** True when values are per serving; false when falling back to per-100g. */
  perServing: boolean;
}

/** Open Food Facts is a free, keyless public database — real product lookups, no API key required. */
export async function lookupBarcode(barcode: string): Promise<BarcodeProduct> {
  const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
  if (!res.ok) throw new Error(`Lookup failed (${res.status})`);
  const json = await res.json();

  if (json.status !== 1 || !json.product) {
    throw new Error('Product not found. Try scanning again or logging it manually.');
  }

  const p = json.product;
  const n = p.nutriments ?? {};
  const perServing = n['energy-kcal_serving'] != null;

  const calories = Math.round(perServing ? n['energy-kcal_serving'] : (n['energy-kcal_100g'] ?? 0));
  const protein = Math.round(perServing ? n['proteins_serving'] : (n['proteins_100g'] ?? 0));
  const carbs = Math.round(perServing ? n['carbohydrates_serving'] : (n['carbohydrates_100g'] ?? 0));
  const fats = Math.round(perServing ? n['fat_serving'] : (n['fat_100g'] ?? 0));

  return {
    name: p.product_name || p.generic_name || `Barcode ${barcode}`,
    calories,
    protein,
    carbs,
    fats,
    perServing,
  };
}
