import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View } from "react-native";
import { Button } from "../../components/Button";

export default function Search() {
  return (
    <SafeAreaView className="flex-1 justify-between items-center p-6 bg-green">
      <Image
        className="h-64 mt-16"
        resizeMode="contain"
        source={require("../../../assets/paw.png")}
      />
      <View className="w-full">
        <Text className="text-white font-bold text-4xl text-center mb-16">
          Queremos saber quais pets mais tocam o seu coração!
        </Text>
        <Button text="Começar" href="/search" variant="secondary" />
      </View>
    </SafeAreaView>
  );
}
