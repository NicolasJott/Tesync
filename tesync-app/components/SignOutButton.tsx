import React from "react";
import { Button, ButtonText } from "tamagui";
import { useSession } from "./context/TeslaSession";

export const SignOutButton = () => {
  const { signOut } = useSession();
  return (
    <Button
      backgroundColor={"#E31937"}
      pressStyle={{ backgroundColor: "#AA1329" }}
      borderRadius={4}
      color={"white"}
    >
      <ButtonText onPress={() => signOut()}>Sign Out</ButtonText>
    </Button>
  );
};
