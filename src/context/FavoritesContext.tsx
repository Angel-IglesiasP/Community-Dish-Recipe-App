import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Recipe } from "../../types/recipe";

type FavoritesContextType = {
  favorites: Recipe[];
  isFavorite: (recipeId: string) => boolean;
  toggleFavorite: (recipe: Recipe) => void;
};

const FAVORITES_STORAGE_KEY = "community-dish-favorites";

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

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(
          FAVORITES_STORAGE_KEY,
        );

        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites from storage", error);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(favorites),
        );
      } catch (error) {
        console.error("Failed to save favorites to storage", error);
      }
    };

    saveFavorites();
  }, [favorites]);

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
