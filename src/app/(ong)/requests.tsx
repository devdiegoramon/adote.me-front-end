import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SearchInput } from "../../components/SearchInput";
import { getSolicitacoesByOngId } from '../../../lib/api/pets';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tipagem da Solicitação
type Solicitacao = {
  _id: string;
  petId: string;
  ongId: string;
  nomeAdotante: string;
  emailAdotante: string;
  telefoneAdotante: string;
  mensagem: string;
  status: "pendente" | "aprovado" | "rejeitado";
  dataSolicitacao: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function RequestsScreen() {
  const [search, setSearch] = useState("");
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Buscar dados do usuário
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user");
        const userData = userJson ? JSON.parse(userJson) : null;
        setUser(userData);
      } catch (error) {
        console.error("❌ Erro ao buscar dados do usuário:", error);
      }
    };

    getUserData();
  }, []);

  // Buscar solicitações quando tiver o usuário
  useEffect(() => {
    const fetchSolicitacoes = async () => {
      if (!user?._id) return;

      try {
        setLoading(true);
        const data = await getSolicitacoesByOngId(user._id);
        setSolicitacoes(data || []);
      } catch (error) {
        console.error("❌ Erro ao buscar solicitações:", error);
        setSolicitacoes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitacoes();
  }, [user]);

  // Função para formatar data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para filtrar solicitações
  const solicitacoesFiltradas = solicitacoes.filter((solicitacao) => {
    if (!search) return true;
    
    const searchLower = search.toLowerCase();
    return (
      solicitacao.nomeAdotante?.toLowerCase().includes(searchLower) ||
      solicitacao.emailAdotante?.toLowerCase().includes(searchLower) ||
      solicitacao.telefoneAdotante?.toLowerCase().includes(searchLower) ||
      solicitacao.mensagem?.toLowerCase().includes(searchLower)
    );
  });

  // Função para obter cor do status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "aprovado":
        return "bg-green-500";
      case "pendente":
        return "bg-yellow-500";
      case "rejeitado":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Função para obter texto do status
  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "aprovado":
        return "Aprovado";
      case "pendente":
        return "Pendente";
      case "rejeitado":
        return "Rejeitado";
      default:
        return status;
    }
  };

  // Função para ligar para o adotante
  const ligarParaAdotante = (telefone: string) => {
    Alert.alert(
      "Ligar para adotante",
      `Deseja ligar para ${telefone}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Ligar", onPress: () => console.log(`Ligando para ${telefone}`) }
      ]
    );
  };

  // Função para enviar email
  const enviarEmail = (email: string) => {
    Alert.alert(
      "Enviar email",
      `Deseja enviar email para ${email}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Enviar", onPress: () => console.log(`Enviando email para ${email}`) }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white px-4 pt-4 justify-center items-center">
        <Text className="text-gray-500">Carregando solicitações...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-4 gap-6" edges={["top"]}>
      {/* Header */}
      <View className="pt-4">
        <Text className="text-2xl font-bold text-black mb-2">
          Solicitações de Adoção
        </Text>
        <Text className="text-gray-600">
          {solicitacoesFiltradas.length} solicitação{solicitacoesFiltradas.length !== 1 ? "ões" : ""} 
          {search ? ` encontrada${solicitacoesFiltradas.length !== 1 ? "s" : ""}` : ""}
        </Text>
      </View>

      {/* Search */}
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Procure pelo nome do adotante, email ou telefone..."
      />

      {/* Lista de Solicitações */}
      <FlatList
        data={solicitacoesFiltradas}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className="bg-gray-50 border border-gray-200 rounded-xl mb-4 p-4">
            {/* Header do Card */}
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-bold text-black flex-1" numberOfLines={1}>
                {item.nomeAdotante}
              </Text>
              <View className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
                <Text className="text-xs font-bold text-white">
                  {getStatusText(item.status)}
                </Text>
              </View>
            </View>

            {/* Informações do Adotante */}
            <View className="mb-3">
              <Text className="text-black mb-1">
                <Text className="font-bold">Email:</Text> {item.emailAdotante}
              </Text>
              <Text className="text-black mb-1">
                <Text className="font-bold">Telefone:</Text> {item.telefoneAdotante}
              </Text>
              <Text className="text-black mb-1">
                <Text className="font-bold">Data:</Text> {formatarData(item.dataSolicitacao)}
              </Text>
            </View>

            {/* Mensagem */}
            {item.mensagem && (
              <View className="mb-3 bg-white p-3 rounded-lg border border-gray-200">
                <Text className="font-bold text-black mb-1">Mensagem:</Text>
                <Text className="text-gray-700">{item.mensagem}</Text>
              </View>
            )}

            {/* Botões de Ação */}
            <View className="flex-row justify-between items-center pt-3 border-t border-gray-200">
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  onPress={() => ligarParaAdotante(item.telefoneAdotante)}
                  className="bg-green-100 p-2 rounded-lg flex-row items-center"
                >
                  <Ionicons name="call" size={16} color="#22c55e" />
                  <Text className="text-green-600 text-sm font-medium ml-1">Ligar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => enviarEmail(item.emailAdotante)}
                  className="bg-blue-100 p-2 rounded-lg flex-row items-center"
                >
                  <Ionicons name="mail" size={16} color="#3b82f6" />
                  <Text className="text-blue-600 text-sm font-medium ml-1">Email</Text>
                </TouchableOpacity>
              </View>

              {/* Botões de Status (só para pendentes) */}
              {item.status === "pendente" && (
                <View className="flex-row space-x-2">
                  <TouchableOpacity className="bg-red-100 p-2 rounded-lg">
                    <Ionicons name="close" size={16} color="#ef4444" />
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-green-100 p-2 rounded-lg">
                    <Ionicons name="checkmark" size={16} color="#22c55e" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="document-text" size={64} color="#9ca3af" />
            <Text className="text-gray-500 text-lg mt-4 text-center">
              {search ? "Nenhuma solicitação encontrada" : "Nenhuma solicitação recebida"}
            </Text>
            <Text className="text-gray-400 text-center mt-2 px-4">
              {search 
                ? `Nenhum resultado para "${search}"`
                : "As solicitações de adoção aparecerão aqui"
              }
            </Text>
            {search && (
              <TouchableOpacity
                onPress={() => setSearch("")}
                className="bg-green-500 px-6 py-3 rounded-lg mt-6"
              >
                <Text className="text-white font-medium">Limpar busca</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}