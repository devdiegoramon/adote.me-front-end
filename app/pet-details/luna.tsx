import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";

const URL = 'http://localhost:3000/download/';

export default function PetDetails() {
  const router = useRouter();

  return (
    <View className="flex-1 px-4 py-6 bg-white">
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6" }}
        className="w-full h-72 rounded-xl mb-4"
        resizeMode="cover"
      />

      <Text className="text-2xl font-bold text-zinc-800 mb-1">Luna</Text>
      <Text className="text-base text-zinc-500">Gata - 2 meses</Text>

      <Text className="mt-6 mb-2 font-medium text-zinc-700">Tags:</Text>
      <View className="flex-row flex-wrap gap-2">
        <Text className="bg-zinc-200 px-4 py-1 rounded-full text-zinc-700 text-sm">Dócil</Text>
        <Text className="bg-zinc-200 px-4 py-1 rounded-full text-zinc-700 text-sm">Pequeno</Text>
        <Text className="bg-zinc-200 px-4 py-1 rounded-full text-zinc-700 text-sm">Carinhoso</Text>
      </View>

      <Text className="mt-6 text-zinc-700">📍 Local de Retirada: <Text className="font-semibold">São Paulo - SP</Text></Text>

      <Pressable
        onPress={() => router.push("/sucess")}
        className="mt-8 bg-emerald-600 rounded-xl py-3 items-center"
      >
        <Text className="text-white font-semibold text-base">Solicitar Adoção</Text>
      </Pressable>
    </View>
  );
}
