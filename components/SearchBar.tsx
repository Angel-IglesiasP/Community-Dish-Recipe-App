import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../constants/colors";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = "Search recipes...",
}: SearchBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor= {colors.place_holder}
        returnKeyType="search"
      />
      <MaterialIcons name="search" size={25} color={colors.place_holder}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 5,
    flex: 1,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: colors.accent,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "500",
    color: colors.main_nav,
  },
});
