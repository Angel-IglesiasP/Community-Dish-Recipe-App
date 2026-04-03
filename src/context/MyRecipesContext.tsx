import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { Recipe } from "../../types/recipe";

type MyRecipesContextType = {
  myRecipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
};

const MY_RECIPES_STORAGE_KEY = "community-dish-my-recipes";

const MyRecipesContext = createContext<MyRecipesContextType | undefined>(
  undefined,
);

type MyRecipesProviderProps = {
  children: ReactNode;
};

export function MyRecipesProvider({ children }: MyRecipesProviderProps) {
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);

  const addRecipe = (recipe: Recipe) => {
    setMyRecipes((currentRecipes) => [recipe, ...currentRecipes]);
  };

  useEffect(() => {
    const loadMyRecipes = async () => {
      try {
        const storedRecipes = await AsyncStorage.getItem(
          MY_RECIPES_STORAGE_KEY,
        );

        if (storedRecipes) {
          setMyRecipes(JSON.parse(storedRecipes));
        }
      } catch (error) {
        console.error("Failed to load my recipes from storage", error);
      }
    };

    loadMyRecipes();
  }, []);

  useEffect(() => {
    const saveMyRecipes = async () => {
      try {
        await AsyncStorage.setItem(
          MY_RECIPES_STORAGE_KEY,
          JSON.stringify(myRecipes),
        );
      } catch (error) {
        console.error("Failed to save my recipes to storage", error);
      }
    };

    saveMyRecipes();
  }, [myRecipes]);

  return (
    <MyRecipesContext.Provider
      value={{
        myRecipes,
        addRecipe,
      }}
    >
      {children}
    </MyRecipesContext.Provider>
  );
}

export function useMyRecipes() {
  const context = useContext(MyRecipesContext);

  if (!context) {
    throw new Error("useMyRecipes must be used inside a MyRecipesProvider");
  }

  return context;
}
