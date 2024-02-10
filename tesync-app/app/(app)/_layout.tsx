import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, Stack, router } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "tamagui";
import { useSession } from "../../components/context/TeslaSession";

export default function AppLayout() {
  const { session, isLoading, refresh } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/home" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerTransparent: true,
          headerRight: () => (
            <Pressable onPress={() => router.push("/(app)/settings")}>
              <MaterialIcons name="settings" size={20} color="white" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
