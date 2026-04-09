import ScreenContainer from "@/components/ScreenContainer";
import SectionHeader from "@/components/SectionHeader";
import { colors } from "@/constants/colors";
import { Picker } from "@react-native-picker/picker";
import * as Speech from "expo-speech";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  // const [autoSave, setAutoSave] = useState<false | true>(false);
  // const [recipeDownload, setRecipeDownload] = useState<true | false>(true);
  const [textSize, setTextSize] = useState<1 | 2 | 3>(2);
  const [textToSpeech, setTextToSpeech] = useState(true);
  const [colourBlind, setColourBlind] = useState<0 | 1 | 2 | 3>(0);

  const [editModal, setEditModal] = useState<true | false>(false);

  const speak = (msg: string) => {
    console.log(textToSpeech);
    if (textToSpeech) {
      Speech.speak(msg);
    }
  };

  return (
    <ScreenContainer>
      <SectionHeader title="Settings" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModal}
        onRequestClose={() => {
          console.log(editModal);
          setEditModal(!editModal);
        }}
      >
        <View style={styles.profileModal}>
          <View style={styles.modalContainer}>
            <Text style={[styles.boldText]}>
              This feature is temporarily unavalible :(
            </Text>
            <Pressable
              style={styles.buttonModal}
              onPress={() => setEditModal(!editModal)}
            >
              <Text style={[styles.boldText, styles.lg]}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <ScrollView vertical>
        <View style={styles.body}>
          <Image
            source={require("@/assets/images/profile.jpg")}
            style={styles.profile}
          />
          <Pressable
            style={styles.buttonContainer}
            onPress={() => setEditModal(!editModal)}
          >
            <Text style={[styles.boldText, styles.lg]}>Edit Profile</Text>
          </Pressable>
        </View>

        <View style={styles.settings}>
          <View style={{ gap: 10 }}>
            <Text style={[styles.boldText, styles.md]}>
              (Not Finished) Text Size:
            </Text>

            <Picker
              style={[styles.picker, styles.boldText]}
              selectedValue={textSize}
              onValueChange={(val) => {
                setTextSize(val);
                speak("Text size is set to: " + val);
              }}
              mode="dropdown"
            >
              <Picker.Item
                style={{ backgroundColor: colors.primary_orange }}
                label="12"
                value={1}
              />
              <Picker.Item
                style={{ backgroundColor: colors.primary_orange }}
                label="16"
                value={2}
              />
              <Picker.Item
                style={{ backgroundColor: colors.primary_orange }}
                label="24"
                value={3}
              />
            </Picker>
          </View>

          <View style={{ gap: 10 }}>
            <Text style={[styles.boldText, styles.md]}>
              (WIP) Text to Speech:
            </Text>
            {/* <Switch value={textToSpeech} onValueChange={setTextToSpeech} /> infinitly loops for some reason*/}
            <Pressable
              style={styles.buttonContainer}
              onPress={() => {
                setTextToSpeech(!textToSpeech);
                speak("Text to speech turned on");
              }}
            >
              {textToSpeech ? (
                <Text style={[styles.boldText, styles.md]}>
                  Text to Speech is: OFF
                </Text>
              ) : (
                <Text style={[styles.boldText, styles.md]}>
                  Text to Speech is: ON
                </Text>
              )}
            </Pressable>
          </View>

          <View style={{ gap: 10 }}>
            <Text style={[styles.boldText, styles.md]}>
              (Not Finished) Colour Blind Colours
            </Text>
            <Picker
              style={[styles.picker, styles.boldText]}
              selectedValue={colourBlind}
              onValueChange={(val) => {
                speak("Colour Blind option selected: " + val);
                setColourBlind(val);
              }}
              mode="dropdown"
            >
              <Picker.Item
                style={{ backgroundColor: colors.primary_orange }}
                label="Red-Green (weak green)"
                value={1}
              />
              <Picker.Item
                style={{ backgroundColor: colors.primary_orange }}
                label="Red-Green (weak red)"
                value={2}
              />
              <Picker.Item
                style={{ backgroundColor: colors.primary_orange }}
                label="Blue-Yellow"
                value={3}
              />
            </Picker>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    padding: 10,
    gap: 10,
  },
  bodyInner: { gap: 10, alignItems: "center" },
  profile: { width: 300, height: 300, borderRadius: 150 },
  boldText: { fontWeight: "bold", color: colors.accent },
  buttonContainer: {
    backgroundColor: colors.primary_orange,
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 210,
  },

  profileModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: colors.main_nav,
    alignItems: "center",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 50,
    gap: 15,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
  buttonModal: {
    backgroundColor: colors.primary_orange,
    borderRadius: 15,
    alignItems: "center",
    width: 100,
    padding: 10,
  },

  settings: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 30,
    gap: 20,
  },
  picker: {
    backgroundColor: colors.primary_orange,
    borderRadius: 25,
    maxWidth: 150,
  },

  sm: { fontSize: 12 },
  md: { fontSize: 16 },
  lg: { fontSize: 24 },
});
