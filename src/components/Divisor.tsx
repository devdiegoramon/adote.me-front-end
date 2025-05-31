import { Text, View } from "react-native";

export function Divisor() {
  return (
    <View className="flex-row items-center w-full gap-4 mb-4">
      <View className="flex-1 h-px bg-gray-200" />
      <Text className="text-gray-500 font-medium">ou</Text>
      <View className="flex-1 h-px bg-gray-200" />
    </View>
  );
}
