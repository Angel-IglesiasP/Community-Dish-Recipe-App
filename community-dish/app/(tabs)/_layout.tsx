import { Tabs, router } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{ title: "Home" }}
        listeners={{
          tabPress: () => {
            router.replace({
              pathname: "/",
              params: { reset: Date.now().toString() },
            });
          },
        }}
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
