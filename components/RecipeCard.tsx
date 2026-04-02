import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { Recipe } from "../types/recipe";

type RecipeCardProps = {
  recipe: Recipe;
  onPress?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

export default function RecipeCard({
  recipe,
  onPress,
  isFavorite = false,
  onToggleFavorite,
}: RecipeCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageWrapper}>
        {recipe.imageUrl ? (
          <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}

        <Pressable style={styles.favoriteButton} onPress={onToggleFavorite}>
          <Text style={styles.favoriteIcon}>{isFavorite ? "★" : "☆"}</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {recipe.category}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {recipe.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.secondary_orange,
    marginBottom: 16,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 140,
  },
  imagePlaceholder: {
    width: "100%",
    height: 140,
    backgroundColor: colors.secondary_orange,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: colors.main_nav,
    fontSize: 16,
  },
  favoriteButton: {
    position: "absolute",
    right: 8,
    bottom: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteIcon: {
    fontSize: 18,
    color: colors.primary_orange,
  },
  content: {
    padding: 16,
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.main_nav,
  },
  meta: {
    fontSize: 14,
    color: colors.main_nav,
  },
  description: {
    fontSize: 15,
    color: colors.main_nav,
  },
});
