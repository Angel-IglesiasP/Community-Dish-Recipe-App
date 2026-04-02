import { createContext, ReactNode, useContext, useState } from "react";
import { Recipe } from "../../types/recipe";

type FavoritesContextType = {
  favorites: Recipe[];
  isFavorite: (recipeId: string) => boolean;
  toggleFavorite: (recipe: Recipe) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

type FavoritesProviderProps = {
  children: ReactNode;
};

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  const isFavorite = (recipeId: string) => {
    return favorites.some((recipe) => recipe.id === recipeId);
  };

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (favorite) => favorite.id === recipe.id,
      );

      if (alreadyFavorite) {
        return currentFavorites.filter((favorite) => favorite.id !== recipe.id);
      }

      return [...currentFavorites, recipe];
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside a FavoritesProvider");
  }

  return context;
}
