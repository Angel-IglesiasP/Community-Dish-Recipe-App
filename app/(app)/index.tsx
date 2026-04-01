import { useAuth } from "@/src/context/AuthContext";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text>Signed in as: {user?.email}</Text>
      <Text>App goes here :)</Text>
      <Pressable onPress={handleLogout}>
        <Text>Press here to logout</Text>
      </Pressable>
    </View>
  );
}
