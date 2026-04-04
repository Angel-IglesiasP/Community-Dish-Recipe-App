import { Recipe } from "../types/recipe";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

type MealDbMeal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  strInstructions: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
};

type MealDbResponse = {
  meals: MealDbMeal[] | null;
};

type MealDbCategoryMeal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type MealDbCategoryResponse = {
  meals: MealDbCategoryMeal[] | null;
};

function extractIngredients(meal: MealDbMeal): string[] {
  const ingredientPairs = [
    { ingredient: meal.strIngredient1, measure: meal.strMeasure1 },
    { ingredient: meal.strIngredient2, measure: meal.strMeasure2 },
    { ingredient: meal.strIngredient3, measure: meal.strMeasure3 },
    { ingredient: meal.strIngredient4, measure: meal.strMeasure4 },
    { ingredient: meal.strIngredient5, measure: meal.strMeasure5 },
    { ingredient: meal.strIngredient6, measure: meal.strMeasure6 },
    { ingredient: meal.strIngredient7, measure: meal.strMeasure7 },
    { ingredient: meal.strIngredient8, measure: meal.strMeasure8 },
    { ingredient: meal.strIngredient9, measure: meal.strMeasure9 },
    { ingredient: meal.strIngredient10, measure: meal.strMeasure10 },
  ];

  return ingredientPairs
    .filter(({ ingredient }) => Boolean(ingredient && ingredient.trim()))
    .map(({ ingredient, measure }) => {
      const cleanIngredient = ingredient?.trim() ?? "";
      const cleanMeasure = measure?.trim() ?? "";

      return cleanMeasure
        ? `${cleanMeasure} ${cleanIngredient}`.trim()
        : cleanIngredient;
    });
}

function cleanPreparationStep(step: string): string {
  return step
    .replace(/^\s*step\s*\d+\s*[:.-]?\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildDescription(instructions: string): string {
  const cleaned = instructions
    .replace(/^\s*step\s*\d+\s*[:.-]?\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

  const firstSentence = cleaned.split(".")[0]?.trim();

  return firstSentence ? `${firstSentence}.` : "No description available.";
}

function mapMealToRecipe(meal: MealDbMeal): Recipe {
  return {
    id: meal.idMeal,
    source: "api",
    title: meal.strMeal,
    description: meal.strInstructions
      ? buildDescription(meal.strInstructions)
      : "No description available.",
    imageUrl: meal.strMealThumb || "",
    category: meal.strCategory || "Unknown",
    servings: "Not specified",
    ingredients: extractIngredients(meal),
    preparation: meal.strInstructions
      ? meal.strInstructions
          .split(".")
          .map((step) => cleanPreparationStep(step))
          .filter(Boolean)
      : [],
  };
}

export async function searchMealsByName(query: string): Promise<Recipe[]> {
  const response = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipes.");
  }

  const data: MealDbResponse = await response.json();

  if (!data.meals) {
    return [];
  }

  return data.meals.map(mapMealToRecipe);
}

export async function getTrendingMeals(): Promise<Recipe[]> {
  const [chickenMeals, seafoodMeals] = await Promise.all([
    getMealsByCategory("Chicken"),
    getMealsByCategory("Seafood"),
  ]);

  return [...chickenMeals.slice(0, 3), ...seafoodMeals.slice(0, 2)];
}

export async function getMealsByCategory(category: string): Promise<Recipe[]> {
  const response = await fetch(
    `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category recipes.");
  }

  const data: MealDbCategoryResponse = await response.json();

  if (!data.meals) {
    return [];
  }

  return data.meals.map((meal) => ({
    id: meal.idMeal,
    source: "api",
    title: meal.strMeal,
    description: "Category recipe preview",
    imageUrl: meal.strMealThumb || "",
    category,
    servings: "Not specified",
    ingredients: [],
    preparation: [],
  }));
}

export async function getMealById(id: string): Promise<Recipe | null> {
  const response = await fetch(
    `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipe details.");
  }

  const data: MealDbResponse = await response.json();

  if (!data.meals || data.meals.length === 0) {
    return null;
  }

  return mapMealToRecipe(data.meals[0]);
}
