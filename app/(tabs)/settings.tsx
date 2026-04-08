import { colors } from "@/constants/colors";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [autoSave, setAutoSave] = useState<false | true>(false);
  const [recipeDownload, setRecipeDownload] = useState<true | false>(true);
  const [textSize, setTextSize] = useState<1 | 2 | 3>(2);
  const [textToSpeech, setTextToSpeech] = useState<false | true>(false);
  const [colourBlind, setColourBlind] = useState<0 | 1 | 2 | 3>(0);

  return (
    <SafeAreaView style={{ backgroundColor: colors.secondary }}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <View style={styles.textContainer}>
          <Text style={styles.headText}>Settings</Text>
        </View>
      </View>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.bodyInner}>
            <Image
              source={require("@/assets/images/profile.jpg")}
              style={styles.profile}
            />
            <Pressable style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </Pressable>
          </View>

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.selectContainer}>
              <Text>Auto Save Recipe</Text>
              <Text>Recipe Download</Text>
              <Text>Text Size</Text>
              <Text>Text To Speech</Text>
              <Text>Colour Blind</Text>
            </View>

            <View style={styles.selectContainer}>
              <Switch
                value={autoSave}
                onValueChange={setAutoSave}
                trackColor={{ true: colors.primary, false: colors.secondary }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    gap: 20,
  },
  headText: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.surface,
  },
  textContainer: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 70,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },

  body: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    padding: 10,
  },
  bodyInner: { gap: 10, alignItems: "center" },
  profile: { width: 300, height: 300, borderRadius: 150 },
  buttonText: { fontSize: 24, fontWeight: "bold", color: colors.surface },
  buttonContainer: {
    backgroundColor: colors.primary,
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  settings: {},
  selectContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
    gap: 10,
  },
});
