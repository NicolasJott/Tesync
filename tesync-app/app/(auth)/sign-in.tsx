import { Redirect } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";
import { View } from "tamagui";
import { TeslaOAuthButton } from "../../components/TeslaApiComponents/TeslaOAuthButton";
import { useSession } from "../../components/context/TeslaSession";

export default function SignIn() {
  const { session } = useSession();

  // If the user is already signed in, redirect them to the app.
  if (session) {
    return <Redirect href="/(app)/(tabs)" />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1} alignItems="center" justifyContent="center">
        <TeslaOAuthButton />
      </View>
    </SafeAreaView>
  );
}
