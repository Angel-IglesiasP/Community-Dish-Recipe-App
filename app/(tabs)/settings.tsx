import SectionHeader from "@/components/SectionHeader";
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
import ScreenContainer from "../../components/ScreenContainer";

export default function SettingsScreen() {
  const [autoSave, setAutoSave] = useState(false);
  const [recipeDownload, setRecipeDownload] = useState(true);
  const [textToSpeech, setTextToSpeech] = useState(false);

  return (
    <ScreenContainer>
      <SectionHeader title="Settings" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileSection}>
          <Image
            source={require("../../assets/images/profile.jpg")}
            style={styles.profileImage}
          />
          <Pressable style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
        </View>

        <View style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Auto Save Recipe</Text>
            <Switch
              value={autoSave}
              onValueChange={setAutoSave}
              trackColor={{
                false: colors.place_holder,
                true: colors.secondary_orange,
              }}
              thumbColor={autoSave ? colors.primary_orange : colors.accent}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Recipe Download</Text>
            <Switch
              value={recipeDownload}
              onValueChange={setRecipeDownload}
              trackColor={{
                false: colors.place_holder,
                true: colors.secondary_orange,
              }}
              thumbColor={
                recipeDownload ? colors.primary_orange : colors.accent
              }
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Text Size</Text>
            <View style={styles.valueBadge}>
              <Text style={styles.valueBadgeText}>Medium</Text>
            </View>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Text To Speech</Text>
            <Switch
              value={textToSpeech}
              onValueChange={setTextToSpeech}
              trackColor={{
                false: colors.place_holder,
                true: colors.secondary_orange,
              }}
              thumbColor={textToSpeech ? colors.primary_orange : colors.accent}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Colour Blind Mode</Text>
            <View style={styles.valueBadge}>
              <Text style={styles.valueBadgeText}>Off</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 14,
    borderWidth: 3,
    borderColor: colors.primary_orange,
  },
  editButton: {
    backgroundColor: colors.primary_orange,
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.accent,
  },
  settingsCard: {
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.secondary_orange,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary_orange,
  },
  settingLabel: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    color: colors.main_nav,
    paddingRight: 12,
  },
  valueBadge: {
    backgroundColor: colors.main_nav,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  valueBadgeText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: "700",
  },
});
