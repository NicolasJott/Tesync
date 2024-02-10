import React from "react";
import { Button } from "tamagui";

export const SignInButton = () => {
  return (
    <Button
      bg={"#3e6ae1"}
      br={4}
      w={"100%"}
      size={"$5"}
      color={"#F2F2F2"}
      pressStyle={{ bg: "#3457b1" }}
    >
      Sign In
    </Button>
  );
};
