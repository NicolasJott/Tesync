import { Fontisto } from "@expo/vector-icons";
import React from "react";
import { Button } from "tamagui";
import { useSession } from "../context/TeslaSession";

export const TeslaOAuthButton = () => {
  const { signIn } = useSession();

  return (
    <Button
      backgroundColor={"#E31937"}
      pressStyle={{ backgroundColor: "#AA1329" }}
      borderRadius={4}
      color={"white"}
      onPress={signIn}
      iconAfter={<Fontisto name="tesla" size={16} color="white" />}
    >
      Sign In With Tesla
    </Button>
  );
};
