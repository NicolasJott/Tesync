import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { View } from "tamagui";
import { SignOutButton } from "../../../components/SignOutButton";

export default function Settings() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Settings",
          headerTintColor: "#E31937",
          headerTransparent: true,
        }}
      />
      <View flex={1} justifyContent="flex-end" p="$4">
        <SignOutButton />
      </View>
    </SafeAreaView>
  );
}
