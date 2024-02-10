import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native";
import { Spinner, Text, View } from "tamagui";
import { getVehicles } from "../api/vehicle";

export default function HomeScreen() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  if (isPending) {
    return (
      <Spinner
        flex={1}
        justifyContent="center"
        size="large"
        color={"#E31937"}
      />
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <Text>Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  console.log(data.response);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <View>
        {data.response.map((vehicle: any) => (
          <View key={vehicle.id}>
            <Text>{vehicle.display_name}</Text>
            <Text>{vehicle.vin}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
