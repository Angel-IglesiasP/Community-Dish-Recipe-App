export type RecipeSource = "api" | "local";

export type Recipe = {
  id: string;
  source: RecipeSource;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  servings: string;
  ingredients: string[];
  preparation: string[];
};
