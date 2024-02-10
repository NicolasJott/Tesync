import { router } from "expo-router";
import React from "react";
import { Button } from "tamagui";

export const CreateAccountButton = () => {
  return (
    <Button
      br={4}
      w={"100%"}
      size={"$5"}
      color={"#222222"}
      onPress={() => router.push("/create-account")}
    >
      Create Account
    </Button>
  );
};
