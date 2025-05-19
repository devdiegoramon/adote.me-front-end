import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

export default function RequestsScreen() {
  const [search, setSearch] = useState("");

  const solicitacoes = [
    {
      id: 1,
      pet: "Bolt",
      interessado: "João Silva",
      data: "15/05/2025",
      status: "Pendente",
    },
    {
      id: 2,
      pet: "Luna",
      interessado: "Maria Oliveira",
      data: "13/05/2025",
      status: "Aprovada",
    },
    {
      id: 3,
      pet: "Max",
      interessado: "Carlos Souza",
      data: "10/05/2025",
      status: "Recusada",
    },
  ];

  const renderSolicitacao = ({ item }) => (
    <View className="bg-gray-50 border border-gray-200 rounded-xl mb-4 p-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold text-black">{item.pet}</Text>
        <View
          className={`px-2 py-1 rounded-full ${
            item.status === "Aprovada"
              ? "bg-green"
              : item.status === "Pendente"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          <Text className="text-xs font-bold text-white">{item.status}</Text>
        </View>
      </View>
      <Text className="text-black">
        <Text className="font-bold">Interessado:</Text> {item.interessado}
      </Text>
      <Text className="text-black">
        <Text className="font-bold">Data:</Text> {item.data}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-4 gap-6">
      <View>
        <Text className="text-2xl font-bold text-black">Solicitações</Text>
        <Text className="text-gray-500">
          Acompanhe as solicitações de adoção recebidas
        </Text>
      </View>

      <View className="flex-row items-center bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2 gap-2">
        <Ionicons name="search" size={20} color={colors.black} />
        <TextInput
          className="w-full placeholder:text-gray-400"
          placeholder="Buscar por pet ou interessado..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={solicitacoes.filter(
          (item) =>
            item.pet.toLowerCase().includes(search.toLowerCase()) ||
            item.interessado.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSolicitacao}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
}
