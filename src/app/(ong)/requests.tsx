import { View, Text, FlatList } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockPets } from "../mock/pets";
import { SearchInput } from "../../components/SearchInput";

export default function RequestsScreen() {
  const [search, setSearch] = useState("");

  const todasSolicitacoes = mockPets.flatMap((pet) =>
    pet.solicitacoes.map((solicitacao) => ({
      ...solicitacao,
      petId: pet.id,
      petNome: pet.nome,
      petImagem: pet.imagem.uri,
    }))
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-4 gap-6" edges={["top"]}>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Procure pelo nome do pet ou interessado..."
      />

      <FlatList
        data={todasSolicitacoes.filter(
          (s) =>
            s.petNome.toLowerCase().includes(search.toLowerCase()) ||
            s.interessado.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(s) => `${s.petId}-${s.id}`}
        renderItem={({ item }) => (
          <View className="bg-gray-50 border border-gray-200 rounded-xl mb-4 p-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-bold text-black">
                {item.petNome}
              </Text>
              <View
                className={`px-2 py-1 rounded-full ${
                  item.status === "Aprovado"
                    ? "bg-green-500"
                    : item.status === "Pendente"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                <Text className="text-xs font-bold text-white">
                  {item.status}
                </Text>
              </View>
            </View>

            <Text className="text-black mb-1">
              <Text className="font-bold">Interessado:</Text> {item.interessado}
            </Text>
            <Text className="text-black mb-1">
              <Text className="font-bold">Data:</Text> {item.data}
            </Text>
            <Text className="text-black mb-1">
              <Text className="font-bold">Contato:</Text> {item.contato}
            </Text>
            <Text className="text-black">
              <Text className="font-bold">Telefone:</Text> {item.telefone}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-8">
            Nenhuma solicitação encontrada
          </Text>
        }
      />
    </SafeAreaView>
  );
}
