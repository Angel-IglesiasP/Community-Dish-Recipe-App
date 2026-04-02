//i gotta add them correct icons //pest_control

import { MaterialIcons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { colors } from "../../constants/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.main_nav,
          height: 70,
          borderTopWidth: 0,
          paddingBottom: 0,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.secondary_orange,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="pest-control" size={size} color={color} />
          ),
        }}
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
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="pest-control" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: "New",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="pest-control" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cookbook"
        options={{
          title: "My Cookbook",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="pest-control" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="pest-control" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
