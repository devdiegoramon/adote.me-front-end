import { View, Text } from "react-native";

interface TitleProps {
  greeting: string;
  subtitle?: string;
}

export function Title({ greeting, subtitle }: TitleProps) {
  return (
    <View className="mb-4">
      <Text className="text-2xl font-bold text-black">{greeting}</Text>
      {subtitle && <Text className="text-gray-500">{subtitle}</Text>}
    </View>
  );
}
