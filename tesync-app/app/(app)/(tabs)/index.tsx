import { useMountEffect } from "@react-hookz/web/src/useMountEffect";
import { Button, ButtonText, Text, View } from "tamagui";
import { SignOutButton } from "../../../components/SignOutButton";
import { getVehicles } from "../../api/vehicle";

export default function TabOneScreen() {
  const getMyVehicles = async () => {
    const getVehiclesState = await getVehicles();
    console.log(getVehiclesState);
  };

  useMountEffect(() => {
    getMyVehicles();
  });

  return (
    <View flex={1} alignItems="center">
      <Text fontSize={20}>Tab One</Text>
      <Button onPress={() => getMyVehicles()}>
        <ButtonText>Get Vehicles</ButtonText>
      </Button>
      <SignOutButton />
    </View>
  );
}
