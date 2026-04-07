import { colors } from "@/constants/colors";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type SettingValues = {
  AutoSave: boolean;
  RecipeDownload: boolean;
  TextSize: number;
  TextToSpeech: boolean;
  ColourBlind: number;
};

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          top: 50,
          gap: 30,
        }}
      >
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 50, height: 50, borderRadius: 25 }}
          resizeMode="contain"
        />
        <View
          style={{
            backgroundColor: colors.primary,
            color: "black",
            padding: 10,
            borderRadius: 30,
            alignItems: "center",
            minWidth: 300,
            maxHeight: 50,
          }}
        >
          <Text
            style={{ fontSize: 24, fontWeight: "bold", color: colors.surface }}
          >
            Settings
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={require("@/assets/images/profile.jpg")}
            style={{ width: 300, height: 300, borderRadius: 150 }}
          />
          <View
            style={{
              backgroundColor: colors.primary,
              padding: 15,
              borderRadius: 32,
            }}
          >
            <Text
              style={{
                color: colors.surface,
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Edit Profile
            </Text>
          </View>

          <View style={{ flex: 1, flexDirection: "row", gap: 200 }}>
            <View style={{ gap: 10 }}>
              <Text style={styles.options}>Auto Save</Text>

              <Text style={styles.options}>Downlaod</Text>

              <Text style={styles.options}>Text Size</Text>

              <Text style={styles.options}>Text to Speech</Text>

              <Text style={styles.options}>Colour Blind</Text>
            </View>

            <View>
              <Pressable>
                <Text>Button</Text>
              </Pressable>

              <Pressable>
                <Text>Button</Text>
              </Pressable>

              <Pressable>
                <Text>Button</Text>
              </Pressable>

              <Pressable>
                <Text>Button</Text>
              </Pressable>

              <Pressable>
                <Text>Button</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10,
    color: colors.surface,
    fontSize: 16,
  },
});
