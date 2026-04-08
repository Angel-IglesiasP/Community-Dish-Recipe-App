import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { Recipe } from "../types/recipe";

type RecipePreviewCardProps = {
  recipe: Recipe;
  onPress?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

export default function RecipePreviewCard({
  recipe,
  onPress,
  isFavorite = false,
  onToggleFavorite,
}: RecipePreviewCardProps) {
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
        <Text style={styles.category}>{recipe.category}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    backgroundColor: colors.accent,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.secondary_orange,
    marginRight: 6,
    marginLeft: 6,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 130,
  },
  imagePlaceholder: {
    width: "100%",
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: colors.main_nav,
    fontSize: 14,
  },
  favoriteButton: {
    position: "absolute",
    right: 8,
    bottom: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteIcon: {
    fontSize: 18,
    color: colors.primary_orange,
  },
  content: {
    padding: 12,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.main_nav,
  },
  category: {
    fontSize: 14,
    color: colors.main_nav,
  },
});
