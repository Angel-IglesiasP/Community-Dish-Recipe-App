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
  const ingredients = [
    meal.strIngredient1,
    meal.strIngredient2,
    meal.strIngredient3,
    meal.strIngredient4,
    meal.strIngredient5,
    meal.strIngredient6,
    meal.strIngredient7,
    meal.strIngredient8,
    meal.strIngredient9,
    meal.strIngredient10,
  ];

  return ingredients.filter(
    (ingredient): ingredient is string =>
      Boolean(ingredient && ingredient.trim())
  );
}

function mapMealToRecipe(meal: MealDbMeal): Recipe {
  return {
    id: meal.idMeal,
    source: "api",
    title: meal.strMeal,
    description: meal.strInstructions || "No description available.",
    imageUrl: meal.strMealThumb || "",
    category: meal.strCategory || "Unknown",
    servings: "Not specified",
    ingredients: extractIngredients(meal),
    preparation: meal.strInstructions
      ? meal.strInstructions
          .split(".")
          .map((step) => step.trim())
          .filter(Boolean)
      : [],
  };
}

export async function searchMealsByName(query: string): Promise<Recipe[]> {
  const response = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
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
    `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
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
