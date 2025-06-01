import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { getPetById } from "../../../../lib/api/pets";
import { Button } from "../../../components/Button"; // Importando o componente Button

const { width, height } = Dimensions.get("window");
const BASE_URL = "http://192.168.0.104:3000/download/";

// Collection de personalidades integrada (mantendo a mesma)
const PERSONALIDADES_DATA = [
  {
    _id: { $oid: "6817d9e4aecd673d504ca51b" },
    personalidade_id: 7,
    nome: "Carinhoso",
    descricao: "Pet com personalidade carinhoso",
    compativel_com: ["outros_caes", "idosos", "casa", "outros_gatos"],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca515" },
    personalidade_id: 1,
    nome: "Brincalhão",
    descricao: "Pet com personalidade brincalhão",
    compativel_com: [
      "outros_caes",
      "idosos",
      "iniciantes",
      "experientes",
      "família",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca516" },
    personalidade_id: 2,
    nome: "Calmo",
    descricao: "Pet com personalidade calmo",
    compativel_com: [
      "apartamento",
      "outros_caes",
      "outros_gatos",
      "idosos",
      "experientes",
      "casa",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca517" },
    personalidade_id: 3,
    nome: "Tímido",
    descricao: "Pet com personalidade tímido",
    compativel_com: [
      "casa",
      "apartamento",
      "idosos",
      "outros_caes",
      "família",
      "crianças",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca518" },
    personalidade_id: 4,
    nome: "Independente",
    descricao: "Pet com personalidade independente",
    compativel_com: ["apartamento", "casa", "iniciantes", "experientes"],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca519" },
    personalidade_id: 5,
    nome: "Sociável",
    descricao: "Pet com personalidade sociável",
    compativel_com: ["crianças", "família", "iniciantes"],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca51a" },
    personalidade_id: 6,
    nome: "Protetor",
    descricao: "Pet com personalidade protetor",
    compativel_com: ["apartamento", "iniciantes", "idosos", "outros_gatos"],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca51c" },
    personalidade_id: 8,
    nome: "Agitado",
    descricao: "Pet com personalidade agitado",
    compativel_com: [
      "família",
      "iniciantes",
      "idosos",
      "outros_caes",
      "experientes",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca51d" },
    personalidade_id: 9,
    nome: "Preguiçoso",
    descricao: "Pet com personalidade preguiçoso",
    compativel_com: [
      "outros_caes",
      "experientes",
      "família",
      "iniciantes",
      "casa",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca51e" },
    personalidade_id: 10,
    nome: "Curioso",
    descricao: "Pet com personalidade curioso",
    compativel_com: ["família", "crianças", "casa"],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca51f" },
    personalidade_id: 11,
    nome: "Territorial",
    descricao: "Pet com personalidade territorial",
    compativel_com: ["casa", "outros_gatos", "iniciantes"],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca520" },
    personalidade_id: 12,
    nome: "Dócil",
    descricao: "Pet com personalidade dócil",
    compativel_com: [
      "família",
      "outros_caes",
      "casa",
      "iniciantes",
      "experientes",
      "outros_gatos",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca521" },
    personalidade_id: 13,
    nome: "Aventureiro",
    descricao: "Pet com personalidade aventureiro",
    compativel_com: [
      "outros_caes",
      "experientes",
      "apartamento",
      "idosos",
      "outros_gatos",
      "família",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca522" },
    personalidade_id: 14,
    nome: "Quieto",
    descricao: "Pet com personalidade quieto",
    compativel_com: [
      "casa",
      "outros_caes",
      "família",
      "idosos",
      "crianças",
      "experientes",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca523" },
    personalidade_id: 15,
    nome: "Companheiro",
    descricao: "Pet com personalidade companheiro",
    compativel_com: ["apartamento", "crianças", "experientes"],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca524" },
    personalidade_id: 16,
    nome: "Corajoso",
    descricao: "Pet com personalidade corajoso",
    compativel_com: [
      "idosos",
      "apartamento",
      "crianças",
      "experientes",
      "casa",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca525" },
    personalidade_id: 17,
    nome: "Medroso",
    descricao: "Pet com personalidade medroso",
    compativel_com: [
      "família",
      "casa",
      "outros_caes",
      "experientes",
      "outros_gatos",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca526" },
    personalidade_id: 18,
    nome: "Observador",
    descricao: "Pet com personalidade observador",
    compativel_com: [
      "idosos",
      "crianças",
      "casa",
      "outros_caes",
      "outros_gatos",
      "experientes",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca527" },
    personalidade_id: 19,
    nome: "Dominante",
    descricao: "Pet com personalidade dominante",
    compativel_com: [
      "experientes",
      "iniciantes",
      "outros_caes",
      "família",
      "casa",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca528" },
    personalidade_id: 20,
    nome: "Submisso",
    descricao: "Pet com personalidade submisso",
    compativel_com: ["apartamento", "experientes", "outros_caes"],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca529" },
    personalidade_id: 21,
    nome: "Amigável",
    descricao: "Pet com personalidade amigável",
    compativel_com: ["família", "casa", "apartamento"],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca52a" },
    personalidade_id: 22,
    nome: "Paciente",
    descricao: "Pet com personalidade paciente",
    compativel_com: [
      "iniciantes",
      "apartamento",
      "experientes",
      "outros_gatos",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca52b" },
    personalidade_id: 23,
    nome: "Energético",
    descricao: "Pet com personalidade energético",
    compativel_com: [
      "iniciantes",
      "família",
      "experientes",
      "apartamento",
      "idosos",
      "outros_caes",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca52c" },
    personalidade_id: 24,
    nome: "Leal",
    descricao: "Pet com personalidade leal",
    compativel_com: [
      "família",
      "apartamento",
      "iniciantes",
      "idosos",
      "experientes",
      "casa",
    ],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca52d" },
    personalidade_id: 25,
    nome: "Inteligente",
    descricao: "Pet com personalidade inteligente",
    compativel_com: ["família", "outros_gatos", "apartamento", "outros_caes"],
  },
  {
    _id: { $oid: "6817d9e4aecd673d504ca52e" },
    personalidade_id: 26,
    nome: "Amoroso",
    descricao: "Pet com personalidade amoroso",
    compativel_com: [
      "outros_caes",
      "apartamento",
      "família",
      "experientes",
      "outros_gatos",
      "crianças",
    ],
  },
];

// Criar mapa para busca rápida por personalidade_id
const PERSONALIDADES_MAP = PERSONALIDADES_DATA.reduce((acc, personalidade) => {
  acc[personalidade.personalidade_id] = personalidade;
  return acc;
}, {} as Record<number, (typeof PERSONALIDADES_DATA)[0]>);

interface Personalidade {
  _id: string;
  nome: string;
  descricao: string;
  compativel_com: string[];
}

interface Pet {
  _id: string;
  nome: string;
  especie?: string;
  raca?: string;
  idade?: number;
  porte?: string;
  sexo?: string;
  cidade?: string;
  estado?: string;
  descricao?: string;
  foto_url?: string;
  vacinado?: boolean;
  castrado?: boolean;
  vermifugado?: boolean;
  personalidades?: any[];
  compativel_com?: string[];
}

export default function PetDetails() {
  const [pet, setPet] = useState<Pet | null>(null);
  const [personalidades, setPersonalidades] = useState<Personalidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWebView, setShowWebView] = useState(false);

  const router = useRouter();
  const { id } = useLocalSearchParams();

  const petId = Array.isArray(id) ? id[0] : id;

  // URL do chatbot
  const chatbotUrl =
    "https://cdn.botpress.cloud/webchat/v2.4/shareable.html?configUrl=https://files.bpcontent.cloud/2025/06/01/01/20250601014915-DB3C324M.json";

  // Função para buscar personalidades pelos IDs
  const getPersonalidadesPorIds = (
    personalidadeIds: any[]
  ): Personalidade[] => {
    console.log("🎭 Buscando personalidades para IDs:", personalidadeIds);

    const personalidadesEncontradas = personalidadeIds
      .map((id) => {
        const numericId = Number(id);
        const personalidade = PERSONALIDADES_MAP[numericId];

        if (personalidade) {
          return {
            _id: personalidade._id.$oid,
            nome: personalidade.nome,
            descricao: personalidade.descricao,
            compativel_com: personalidade.compativel_com,
          };
        }

        console.warn(`Personalidade com ID ${id} não encontrada`);
        return null;
      })
      .filter(Boolean) as Personalidade[];

    console.log("✅ Personalidades encontradas:", personalidadesEncontradas);
    return personalidadesEncontradas;
  };

  useEffect(() => {
    const fetchPetDetails = async () => {
      if (!petId) {
        setError("ID do pet não foi fornecido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log("📡 Buscando pet com ID:", petId);
        const data = await getPetById(petId);
        console.log("✅ Dados recebidos:", JSON.stringify(data, null, 2));

        if (!data) {
          throw new Error("Pet não encontrado");
        }

        setPet(data);

        // Buscar personalidades se existirem
        if (data.personalidades && data.personalidades.length > 0) {
          console.log("🎭 IDs das personalidades:", data.personalidades);
          const personalidadesData = getPersonalidadesPorIds(
            data.personalidades
          );
          setPersonalidades(personalidadesData);
        }
      } catch (error) {
        console.error("❌ Erro:", error);
        setError(
          error instanceof Error ? error.message : "Erro ao carregar pet"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [petId]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#22c55e" />
        <Text className="mt-4 text-gray-600">Carregando informações...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white px-4">
        <Ionicons name="alert-circle" size={64} color="#ef4444" />
        <Text className="text-red-500 text-center mb-4 text-lg">{error}</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-green-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-medium">Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!pet) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white px-4">
        <Ionicons name="paw" size={64} color="#9ca3af" />
        <Text className="text-gray-600 text-center mb-4 text-lg">
          Pet não encontrado
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-green-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-medium">Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={[]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header com imagem e botão voltar */}
          <View className="relative">
            <Image
              source={{
                uri: pet.foto_url
                  ? `${BASE_URL}${pet.foto_url}`
                  : "https://via.placeholder.com/600x400/cccccc/666666?text=Sem+Foto",
              }}
              style={{ width, height: 300 }}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute top-4 left-4 bg-black/50 p-2 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="p-4 gap-6">
            {/* Nome do pet */}
            <View>
              <Text className="text-4xl font-bold text-black mb-2">
                {pet.nome}
              </Text>

              {/* Informações básicas em linha */}
              <View className="flex-row items-center gap-4 flex-wrap">
                {pet.especie && (
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="paw" size={16} color="#22c55e" />
                    <Text className="text-gray-600">{pet.especie}</Text>
                  </View>
                )}
                {pet.idade && (
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="time" size={16} color="#22c55e" />
                    <Text className="text-gray-600">{pet.idade} anos</Text>
                  </View>
                )}
                {pet.porte && (
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="resize" size={16} color="#22c55e" />
                    <Text className="text-gray-600">{pet.porte}</Text>
                  </View>
                )}
                {pet.sexo && (
                  <View className="flex-row items-center gap-1">
                    <Ionicons
                      name={
                        pet.sexo.toLowerCase() === "macho" ? "male" : "female"
                      }
                      size={16}
                      color="#22c55e"
                    />
                    <Text className="text-gray-600">{pet.sexo}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Descrição do pet */}
            {pet.descricao && (
              <View className="bg-green-50 p-4 rounded-xl">
                <Text className="text-xl font-semibold text-black mb-3">
                  📝 Sobre {pet.nome}
                </Text>
                <Text className="text-gray-800 leading-6 text-base">
                  {pet.descricao}
                </Text>
              </View>
            )}

            {/* Personalidades */}
            {personalidades.length > 0 && (
              <View className="bg-yellow-50 p-4 rounded-xl">
                <Text className="text-xl font-semibold text-black mb-4">
                  🎭 Personalidade
                </Text>
                <View className="gap-3">
                  {personalidades.map((personalidade, index) => (
                    <View
                      key={personalidade._id || index}
                      className="bg-white p-4 rounded-lg border border-yellow-200 shadow-sm"
                    >
                      <Text className="text-lg font-bold text-yellow-800 mb-2">
                        {personalidade.nome}
                      </Text>
                      <Text className="text-gray-700 leading-5 text-base mb-3">
                        {personalidade.descricao}
                      </Text>

                      {/* Compatibilidades */}
                      {personalidade.compativel_com &&
                        personalidade.compativel_com.length > 0 && (
                          <View>
                            <Text className="text-sm font-semibold text-gray-600 mb-2">
                              Compatível com:
                            </Text>
                            <View className="flex-row flex-wrap gap-1">
                              {personalidade.compativel_com
                                .slice(0, 4)
                                .map((item, idx) => (
                                  <View
                                    key={idx}
                                    className="bg-yellow-100 px-2 py-1 rounded-full"
                                  >
                                    <Text className="text-yellow-700 text-xs">
                                      {item.replace("_", " ")}
                                    </Text>
                                  </View>
                                ))}
                              {personalidade.compativel_com.length > 4 && (
                                <View className="bg-gray-100 px-2 py-1 rounded-full">
                                  <Text className="text-gray-600 text-xs">
                                    +{personalidade.compativel_com.length - 4}
                                  </Text>
                                </View>
                              )}
                            </View>
                          </View>
                        )}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Localização */}
            {(pet.cidade || pet.estado) && (
              <View className="bg-blue-50 p-4 rounded-xl">
                <Text className="text-lg font-semibold text-black mb-2">
                  📍 Localização
                </Text>
                <View className="flex-row items-center gap-2">
                  <Ionicons name="location" size={20} color="#3b82f6" />
                  <Text className="text-gray-700 text-base">
                    {pet.cidade && pet.estado
                      ? `${pet.cidade} - ${pet.estado}`
                      : pet.cidade || pet.estado || "Não informado"}
                  </Text>
                </View>
              </View>
            )}

            {/* Status de saúde */}
            {(pet.vacinado || pet.castrado || pet.vermifugado) && (
              <View className="bg-purple-50 p-4 rounded-xl">
                <Text className="text-lg font-semibold text-black mb-3">
                  🏥 Status de Saúde
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {pet.vacinado && (
                    <View className="bg-green-100 border border-green-200 px-3 py-2 rounded-full">
                      <Text className="text-green-800 text-sm font-medium">
                        ✅ Vacinado
                      </Text>
                    </View>
                  )}
                  {pet.castrado && (
                    <View className="bg-blue-100 border border-blue-200 px-3 py-2 rounded-full">
                      <Text className="text-blue-800 text-sm font-medium">
                        ✅ Castrado
                      </Text>
                    </View>
                  )}
                  {pet.vermifugado && (
                    <View className="bg-purple-100 border border-purple-200 px-3 py-2 rounded-full">
                      <Text className="text-purple-800 text-sm font-medium">
                        ✅ Vermifugado
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}
            <Button
              text="Quero adotar"
              onPress={() => {
                console.log("Botão de adoção pressionado!");
                setShowWebView(true);
              }}
              variant="primary"
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Modal com WebView */}
      <Modal
        visible={showWebView}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-white">
          {/* Header do Modal */}
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <Text className="text-lg font-semibold text-black">
              Processo de Adoção
            </Text>
            <TouchableOpacity
              onPress={() => setShowWebView(false)}
              className="p-2"
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* WebView */}
          <WebView
            source={{ uri: chatbotUrl }}
            style={{ flex: 1 }}
            startInLoadingState={true}
            renderLoading={() => (
              <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#22c55e" />
                <Text className="mt-4 text-gray-600">Carregando chat...</Text>
              </View>
            )}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error("WebView error: ", nativeEvent);
              Alert.alert(
                "Erro",
                "Não foi possível carregar o chat. Tente novamente.",
                [
                  {
                    text: "Fechar",
                    onPress: () => setShowWebView(false),
                  },
                ]
              );
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
}
