import { useMountEffect } from "@react-hookz/web/src/useMountEffect";
import { Redirect, Stack } from "expo-router";
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
    return <Redirect href="/sign-in" />;
  }

  useMountEffect(() => {
    if (session) {
      refresh();
    }
  });

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}