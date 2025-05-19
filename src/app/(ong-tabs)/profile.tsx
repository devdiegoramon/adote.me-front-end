import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const user = {
    nome: "Amigos de Pata",
    email: "amigospata123@email.com",
    telefone: "(81) 91234-5678",
    cnpj: "12.345.678/0001-90",
    endereco: "Rua das Flores, 123 - Recife, PE",
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-6 gap-4">
      <View className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
        <Text className="text-xs text-gray-500">Nome</Text>
        <Text className="text-base text-black font-medium">{user.nome}</Text>
      </View>

      <View className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
        <Text className="text-xs text-gray-500">E-mail</Text>
        <Text className="text-base text-black font-medium">{user.email}</Text>
      </View>

      <View className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
        <Text className="text-xs text-gray-500">Telefone</Text>
        <Text className="text-base text-black font-medium">
          {user.telefone}
        </Text>
      </View>

      <View className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
        <Text className="text-xs text-gray-500">CPF</Text>
        <Text className="text-base text-black font-medium">{user.cnpj}</Text>
      </View>

      <View className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
        <Text className="text-xs text-gray-500">Endereço</Text>
        <Text className="text-base text-black font-medium">
          {user.endereco}
        </Text>
      </View>
    </SafeAreaView>
  );
}
