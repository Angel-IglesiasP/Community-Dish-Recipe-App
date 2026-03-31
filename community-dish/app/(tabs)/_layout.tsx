import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{ title: "Home" }}
      />
      <Tabs.Screen
        name="favorites"
        options={{ title: "Favorites" }}
      />
      <Tabs.Screen
        name="new"
        options={{ title: "New" }}
      />
      <Tabs.Screen
        name="cookbook"
        options={{ title: "My Cookbook" }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "Settings" }}
      />
    </Tabs>
  );
}
