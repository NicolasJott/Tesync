import { Text, View } from "tamagui";
import { SignOutButton } from "../../../components/SignOutButton";

export default function TabOneScreen() {
  return (
    <View flex={1} alignItems="center">
      <Text fontSize={20}>Tab One</Text>
      <SignOutButton />
    </View>
  );
}
