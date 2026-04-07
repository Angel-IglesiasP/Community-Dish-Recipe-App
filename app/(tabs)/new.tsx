import { useMyRecipes } from "@/src/context/MyRecipesContext";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import { colors } from "../../constants/colors";

export default function NewRecipeScreen() {
  const { addRecipe } = useMyRecipes();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");

  const [ingredients, setIngredients] = useState([{ amount: "", name: "" }]);
  const [preparationSteps, setPreparationSteps] = useState([{ step: "" }]);

  //drawe menu navigation
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const [titleY, setTitleY] = useState(0);
  const [categoryY, setCategoryY] = useState(0);
  const [descriptionY, setDescriptionY] = useState(0);
  const [servingsY, setServingsY] = useState(0);
  const [ingredientsY, setIngredientsY] = useState(0);
  const [preparationY, setPreparationY] = useState(0);

  const scrollToSection = (y: number) => {
    scrollViewRef.current?.scrollTo({ y, animated: true });
    setMenuOpen(false);
  };

  const updateIngredient = (
    index: number,
    field: "amount" | "name",
    value: string,
  ) => {
    setIngredients((currentIngredients) =>
      currentIngredients.map((ingredient, currentIndex) =>
        currentIndex === index ? { ...ingredient, [field]: value } : ingredient,
      ),
    );
  };

  const addIngredient = () => {
    setIngredients((currentIngredients) => [
      ...currentIngredients,
      { amount: "", name: "" },
    ]);
  };

  const updatePreparationStep = (index: number, value: string) => {
    setPreparationSteps((currentSteps) =>
      currentSteps.map((stepItem, currentIndex) =>
        currentIndex === index ? { step: value } : stepItem,
      ),
    );
  };

  const addPreparationStep = () => {
    setPreparationSteps((currentSteps) => [...currentSteps, { step: "" }]);
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setServings("");
    setIngredients([{ amount: "", name: "" }]);
    setPreparationSteps([{ step: "" }]);
  };

  const handleSaveRecipe = () => {
    const filteredIngredients = ingredients
      .filter((ingredient) => ingredient.name.trim())
      .map((ingredient) =>
        ingredient.amount.trim()
          ? `${ingredient.amount.trim()} ${ingredient.name.trim()}`
          : ingredient.name.trim(),
      );

    const filteredPreparation = preparationSteps
      .map((step) => step.step.trim())
      .filter(Boolean);

    const newRecipe = {
      id: Date.now().toString(),
      source: "local" as const,
      title: title.trim() || "Untitled Recipe",
      description: description.trim() || "No description provided.",
      imageUrl: "",
      category: category.trim() || "Custom",
      servings: servings.trim() || "Not specified",
      ingredients: filteredIngredients,
      preparation: filteredPreparation,
    };

    addRecipe(newRecipe);
    resetForm();
    router.push("/(tabs)/cookbook");
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Pressable onPress={() => setMenuOpen((current) => !current)}>
            <Text style={styles.menuButtonText}>☰</Text>
          </Pressable>

          <View style={styles.titleOverlay}>
            <View style={styles.titlePill}>
              <Text style={styles.titleText}>
                {title.trim() || "New Recipe"}
              </Text>
            </View>
          </View>
        </View>
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
                onPress={() => scrollToSection(categoryY)}
              >
                <Text style={styles.drawerItemText}>Category</Text>
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
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={styles.fieldBlock}
            onLayout={(event) => setTitleY(event.nativeEvent.layout.y)}
          >
            <View style={styles.fieldLabelPill}>
              <Text style={styles.fieldLabelText}>Title</Text>
            </View>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter recipe title"
              placeholderTextColor={colors.place_holder}
              style={styles.input}
            />
          </View>

          <View
            style={styles.fieldBlock}
            onLayout={(event) => setCategoryY(event.nativeEvent.layout.y)}
          >
            <View style={styles.fieldLabelPill}>
              <Text style={styles.fieldLabelText}>Category</Text>
            </View>
            <TextInput
              value={category}
              onChangeText={setCategory}
              placeholder="Enter recipe category"
              placeholderTextColor={colors.place_holder}
              style={styles.input}
            />
          </View>

          <View
            style={styles.fieldBlock}
            onLayout={(event) => setDescriptionY(event.nativeEvent.layout.y)}
          >
            <View style={styles.fieldLabelPill}>
              <Text style={styles.fieldLabelText}>Description</Text>
            </View>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Enter recipe description"
              placeholderTextColor={colors.place_holder}
              style={styles.textArea}
              multiline
              textAlignVertical="top"
            />
          </View>

          <View
            style={styles.fieldBlock}
            onLayout={(event) => setServingsY(event.nativeEvent.layout.y)}
          >
            <View style={styles.fieldLabelPill}>
              <Text style={styles.fieldLabelText}>Servings</Text>
            </View>
            <TextInput
              value={servings}
              onChangeText={setServings}
              placeholder="e.g. 4-6 people"
              placeholderTextColor={colors.place_holder}
              style={styles.input}
            />
          </View>

          <View style={styles.divider} />

          <View
            style={styles.fieldBlock}
            onLayout={(event) => setIngredientsY(event.nativeEvent.layout.y)}
          >
            <View style={styles.fieldLabelPill}>
              <Text style={styles.fieldLabelText}>Ingredients</Text>
            </View>
          </View>

          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientRow}>
              <TextInput
                value={ingredient.amount}
                onChangeText={(value) =>
                  updateIngredient(index, "amount", value)
                }
                placeholder="Qty"
                placeholderTextColor={colors.place_holder}
                style={styles.amountInput}
              />
              <TextInput
                value={ingredient.name}
                onChangeText={(value) => updateIngredient(index, "name", value)}
                placeholder="Ingredient name"
                placeholderTextColor={colors.place_holder}
                style={styles.ingredientInput}
              />
            </View>
          ))}

          <Pressable style={styles.addButton} onPress={addIngredient}>
            <Text style={styles.addButtonText}>+ Add ingredient</Text>
          </Pressable>

          <View style={styles.divider} />

          <View
            style={styles.fieldBlock}
            onLayout={(event) => setPreparationY(event.nativeEvent.layout.y)}
          >
            <View style={styles.fieldLabelPill}>
              <Text style={styles.fieldLabelText}>Preparation</Text>
            </View>
          </View>

          {preparationSteps.map((stepItem, index) => (
            <View key={index} style={styles.preparationRow}>
              <View style={styles.stepNumberBox}>
                <Text style={styles.amountText}>{index + 1}</Text>
              </View>
              <TextInput
                value={stepItem.step}
                onChangeText={(value) => updatePreparationStep(index, value)}
                placeholder={`Describe step ${index + 1}`}
                placeholderTextColor={colors.place_holder}
                style={styles.preparationInput}
                multiline
                textAlignVertical="top"
              />
            </View>
          ))}

          <Pressable style={styles.addButton} onPress={addPreparationStep}>
            <Text style={styles.addButtonText}>+ Add step</Text>
          </Pressable>

          <Pressable style={styles.saveButton} onPress={handleSaveRecipe}>
            <Text style={styles.saveButtonText}>Save Recipe</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: colors.main_nav,
    marginBottom: 15,
  },
  menuButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  menuButtonText: {
    fontSize: 60,
    fontWeight: "800",
    color: colors.primary_orange,
  },
  titleOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 70,
  },
  keyboardWrapper: {
    flex: 1,
  },
  titlePill: {
    minWidth: 200,
    backgroundColor: colors.primary_orange,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "center",
  },
  titleText: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 60,
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
  input: {
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.secondary_orange,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.main_nav,
    fontSize: 18,
  },
  textArea: {
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.secondary_orange,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.place_holder,
    fontSize: 18,
    minHeight: 140,
  },
  divider: {
    height: 2,
    backgroundColor: colors.secondary_orange,
    marginBottom: 22,
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 18,
  },
  amountInput: {
    width: 70,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.secondary_orange,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    color: colors.main_nav,
    fontSize: 16,
    textAlign: "center",
  },
  ingredientInput: {
    flex: 1,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.secondary_orange,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.main_nav,
    fontSize: 16,
  },
  addButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary_orange,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: "700",
  },
  amountText: {
    color: colors.main_nav,
    fontSize: 16,
    fontWeight: "700",
  },
  preparationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 22,
  },
  stepNumberBox: {
    minWidth: 34,
    paddingHorizontal: 6,
    paddingVertical: 10,
    backgroundColor: colors.accent,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  preparationInput: {
    flex: 1,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.secondary_orange,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.main_nav,
    fontSize: 16,
    minHeight: 90,
  },
  saveButton: {
    alignSelf: "stretch",
    backgroundColor: colors.main_nav,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  saveButtonText: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: "700",
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
