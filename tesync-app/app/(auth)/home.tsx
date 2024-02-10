import { CreateAccountButton, SignInButton } from "@/components/buttons";
import React from "react";
import { SafeAreaView } from "react-native";
import { Heading, View, YStack } from "tamagui";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="space-around"
        mb="$6"
      >
        <View flex={1} alignItems="center" justifyContent="center">
          <Heading size={"$9"} color={"#222222"}>
            Welcome to Tesync
          </Heading>
        </View>
        <YStack w={"90%"} alignItems="center" gap={20}>
          <SignInButton />
          <CreateAccountButton />
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
