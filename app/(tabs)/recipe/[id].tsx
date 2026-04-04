import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RecipeHeader from "../../../components/RecipeHeader";
import ScreenContainer from "../../../components/ScreenContainer";
import { colors } from "../../../constants/colors";
import { getMealById } from "../../../services/mealDb";
import { Recipe } from "../../../types/recipe";

export default function RecipeDetailScreen() {
  const { recipe: recipeParam } = useLocalSearchParams<{ recipe?: string }>();

  const [menuOpen, setMenuOpen] = useState(false);
  const [displayRecipe, setDisplayRecipe] = useState<Recipe | null>(null);
  const [loadingRecipe, setLoadingRecipe] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const [titleY, setTitleY] = useState(0);
  const [descriptionY, setDescriptionY] = useState(0);
  const [servingsY, setServingsY] = useState(0);
  const [ingredientsY, setIngredientsY] = useState(0);
  const [preparationY, setPreparationY] = useState(0);

  const scrollToSection = (y: number) => {
    scrollViewRef.current?.scrollTo({ y, animated: true });
    setMenuOpen(false);
  };

  const recipe: Recipe | undefined = recipeParam
    ? JSON.parse(recipeParam)
    : undefined;

  useEffect(() => {
    const loadRecipeDetails = async () => {
      if (!recipe) {
        setDisplayRecipe(null);
        return;
      }

      if (recipe.source === "local") {
        setDisplayRecipe(recipe);
        return;
      }

      try {
        setLoadingRecipe(true);
        const fullRecipe = await getMealById(recipe.id);
        setDisplayRecipe(fullRecipe ?? recipe);
      } catch (error) {
        setDisplayRecipe(recipe);
      } finally {
        setLoadingRecipe(false);
      }
    };

    loadRecipeDetails();
  }, [recipeParam]);

  if (!recipe) {
    return (
      <ScreenContainer>
        <RecipeHeader
          title="Recipe"
          onMenuPress={() => setMenuOpen((current) => !current)}
        />

        {menuOpen ? (
          <>
            <Pressable
              style={styles.drawerBackdrop}
              onPress={() => setMenuOpen(false)}
            />
            <View style={styles.drawerPanel}>
              <Pressable
                style={styles.drawerItem}
                onPress={() => scrollToSection(titleY)}
              >
                <Text style={styles.drawerItemText}>Title</Text>
              </Pressable>
              <Pressable
                style={styles.drawerItem}
                onPress={() => scrollToSection(descriptionY)}
              >
                <Text style={styles.drawerItemText}>Description</Text>
              </Pressable>
              <Pressable
                style={styles.drawerItem}
                onPress={() => scrollToSection(servingsY)}
              >
                <Text style={styles.drawerItemText}>Servings</Text>
              </Pressable>
              <Pressable
                style={styles.drawerItem}
                onPress={() => scrollToSection(ingredientsY)}
              >
                <Text style={styles.drawerItemText}>Ingredients</Text>
              </Pressable>
              <Pressable
                style={styles.drawerItem}
                onPress={() => scrollToSection(preparationY)}
              >
                <Text style={styles.drawerItemText}>Preparation</Text>
              </Pressable>
            </View>
          </>
        ) : null}

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Recipe not found.</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (loadingRecipe && !displayRecipe) {
    return (
      <ScreenContainer>
        <RecipeHeader
          title={recipe.title}
          onMenuPress={() => setMenuOpen((current) => !current)}
        />
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.primary_orange} />
        </View>
      </ScreenContainer>
    );
  }

  if (!displayRecipe) {
    return (
      <ScreenContainer>
        <RecipeHeader
          title="Recipe"
          onMenuPress={() => setMenuOpen((current) => !current)}
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Recipe not found.</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <RecipeHeader
        title={displayRecipe.title}
        onMenuPress={() => setMenuOpen((current) => !current)}
      />

      {menuOpen ? (
        <>
          <Pressable
            style={styles.drawerBackdrop}
            onPress={() => setMenuOpen(false)}
          />
          <View style={styles.drawerPanel}>
            <Pressable
              style={styles.drawerItem}
              onPress={() => scrollToSection(titleY)}
            >
              <Text style={styles.drawerItemText}>Title</Text>
            </Pressable>

            <Pressable
              style={styles.drawerItem}
              onPress={() => scrollToSection(descriptionY)}
            >
              <Text style={styles.drawerItemText}>Description</Text>
            </Pressable>

            <Pressable
              style={styles.drawerItem}
              onPress={() => scrollToSection(servingsY)}
            >
              <Text style={styles.drawerItemText}>Servings</Text>
            </Pressable>

            <Pressable
              style={styles.drawerItem}
              onPress={() => scrollToSection(ingredientsY)}
            >
              <Text style={styles.drawerItemText}>Ingredients</Text>
            </Pressable>

            <Pressable
              style={styles.drawerItem}
              onPress={() => scrollToSection(preparationY)}
            >
              <Text style={styles.drawerItemText}>Preparation</Text>
            </Pressable>
          </View>
        </>
      ) : null}

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={styles.fieldBlock}
          onLayout={(event) => setTitleY(event.nativeEvent.layout.y)}
        >
          <View style={styles.fieldLabelPill}>
            <Text style={styles.fieldLabelText}>Title</Text>
          </View>
          <Text style={styles.fieldValueText}>{displayRecipe.title}</Text>
        </View>

        <View
          style={styles.fieldBlock}
          onLayout={(event) => setDescriptionY(event.nativeEvent.layout.y)}
        >
          <View style={styles.fieldLabelPill}>
            <Text style={styles.fieldLabelText}>Description</Text>
          </View>
          <Text style={styles.fieldValueText}>{displayRecipe.description}</Text>
        </View>

        <View
          style={styles.fieldBlock}
          onLayout={(event) => setServingsY(event.nativeEvent.layout.y)}
        >
          <View style={styles.fieldLabelPill}>
            <Text style={styles.fieldLabelText}>Servings</Text>
          </View>
          <Text style={styles.fieldValueText}>{displayRecipe.servings}</Text>
        </View>

        <View
          style={styles.fieldBlock}
          onLayout={(event) => setIngredientsY(event.nativeEvent.layout.y)}
        >
          <View style={styles.fieldLabelPill}>
            <Text style={styles.fieldLabelText}>Ingredients</Text>
          </View>

          {displayRecipe.ingredients.length === 0 ? (
            <Text style={styles.fieldValueText}>No ingredients provided.</Text>
          ) : (
            displayRecipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.listRow}>
                <View style={styles.numberBox}>
                  <Text style={styles.numberText}>{index + 1}</Text>
                </View>
                <Text style={styles.listText}>{ingredient}</Text>
              </View>
            ))
          )}
        </View>

        <View
          style={styles.fieldBlock}
          onLayout={(event) => setPreparationY(event.nativeEvent.layout.y)}
        >
          <View style={styles.fieldLabelPill}>
            <Text style={styles.fieldLabelText}>Preparation</Text>
          </View>

          {displayRecipe.preparation.length === 0 ? (
            <Text style={styles.fieldValueText}>
              No preparation steps provided.
            </Text>
          ) : (
            displayRecipe.preparation.map((step, index) => (
              <View key={index} style={styles.listRow}>
                <View style={styles.numberBox}>
                  <Text style={styles.numberText}>{index + 1}</Text>
                </View>
                <Text style={styles.listText}>{step}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 30,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 16,
    color: colors.main_nav,
    textAlign: "center",
  },
  fieldBlock: {
    marginBottom: 26,
  },
  fieldLabelPill: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary_orange,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 10,
  },
  fieldLabelText: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: "700",
  },
  fieldValueText: {
    color: colors.main_nav,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "500",
  },
  listRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 18,
  },
  numberBox: {
    minWidth: 34,
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: colors.accent,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  numberText: {
    color: colors.main_nav,
    fontSize: 16,
    fontWeight: "700",
  },
  listText: {
    flex: 1,
    color: colors.main_nav,
    fontSize: 17,
    lineHeight: 26,
    fontWeight: "500",
  },
  drawerBackdrop: {
    position: "absolute",
    top: 70,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 15,
  },
  drawerPanel: {
    position: "absolute",
    top: 70,
    left: 0,
    bottom: 0,
    width: "58%",
    backgroundColor: colors.main_nav,
    paddingTop: 25,
    paddingHorizontal: 18,
    zIndex: 20,
  },
  drawerItem: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary_orange,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 18,
  },
  drawerItemText: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: "700",
  },
});
