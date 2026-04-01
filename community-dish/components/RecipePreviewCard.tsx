import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Recipe } from "../types/recipe";
import { colors } from "../constants/colors";

type RecipePreviewCardProps = {
  recipe: Recipe;
  onPress?: () => void;
};

export default function RecipePreviewCard({
  recipe,
  onPress,
}: RecipePreviewCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {recipe.imageUrl ? (
        <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>
        <Text style={styles.category}>{recipe.category}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 8,
    shadowColor: "#0000003f",
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  image: {
    width: "100%",
    height: 110,
  },
  imagePlaceholder: {
    width: "100%",
    height: 110,
    backgroundColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: colors.mutedText,
    fontSize: 14,
  },
  content: {
    padding: 8,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  category: {
    fontSize: 14,
    color: colors.mutedText,
  },
});
