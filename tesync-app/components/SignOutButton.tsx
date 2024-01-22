import React from "react";
import { Button, ButtonText } from "tamagui";
import { useSession } from "./context/TeslaSession";

export const SignOutButton = () => {
  const { signOut } = useSession();
  return (
    <Button>
      <ButtonText onPress={signOut}>Sign Out</ButtonText>
    </Button>
  );
};
