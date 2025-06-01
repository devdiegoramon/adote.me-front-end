import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
  Modal,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";

// Obter dimensões da tela
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// URL base para imagens
const URL = "http://192.168.0.104:3333/download/";

// Tipagem do Pet recomendação
type Pet = {
  pet_id: string;
  nome: string;
  especie: string;
  idade_pet: number;
  porte_pet_grande: number;
  porte_pet_medio: number;
  porte_pet_pequeno: number;
  cidade: string;
  estado: string;
  imagens: string[];
  probabilidade: number;
  descricao: string;
};

// Tipagem das preferências
type Preferencias = {
  usuario_id: string;
  nome: string;
  idade_usuario: number;
  coordenadas: {
    latitude: number;
    longitude: number;
  };
  tipoResidencia: string;
  horasSozinhoPet: number;
  possuiPets: number;
  experienciaPrevia: number;
  tem_criancas: boolean;
  aceita_necessidades_especiais: boolean;
  preferencias_especie: string;
  preferencias_porte: string;
  preferencias_nivel_energia: string;
  distancia_maxima: number;
  prefere_vacinado: boolean;
  prefere_castrado: boolean;
  prefere_vermifugado: boolean;
  prefere_sociavel_caes: boolean;
  prefere_sociavel_gatos: boolean;
  prefere_sociavel_criancas: boolean;
};

export default function RecommendationScreen() {
  const [recomendacoes, setRecomendacoes] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [locationLoading, setLocationLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<
    "especie" | "porte" | "energia" | "residencia"
  >("especie");
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  const totalSteps = 5;

  // Estados do formulário
  const [preferencias, setPreferencias] = useState<Preferencias>({
    usuario_id: "123",
    nome: "",
    idade_usuario: 25,
    coordenadas: {
      latitude: 0,
      longitude: 0,
    },
    tipoResidencia: "apartamento",
    horasSozinhoPet: 4,
    possuiPets: 0,
    experienciaPrevia: 0,
    tem_criancas: false,
    aceita_necessidades_especiais: false,
    preferencias_especie: "cachorro",
    preferencias_porte: "medio",
    preferencias_nivel_energia: "moderado",
    distancia_maxima: 50,
    prefere_vacinado: true,
    prefere_castrado: true,
    prefere_vermifugado: false,
    prefere_sociavel_caes: false,
    prefere_sociavel_gatos: false,
    prefere_sociavel_criancas: false,
  });

  // Opções para os selects
  const opcoes = {
    residencia: [
      { label: "Apartamento", value: "apartamento", icon: "🏠" },
      { label: "Casa", value: "casa", icon: "🏡" },
      { label: "Chácara", value: "chácara", icon: "🌳" },
    ],
    especie: [
      { label: "Cachorro", value: "cachorro", icon: "🐕" },
      { label: "Gato", value: "gato", icon: "🐱" },
      { label: "Qualquer um", value: "qualquer", icon: "🐾" },
    ],
    porte: [
      { label: "Pequeno", value: "pequeno", icon: "🐕‍🦺" },
      { label: "Médio", value: "medio", icon: "🐕" },
      { label: "Grande", value: "grande", icon: "🐕‍🦮" },
      { label: "Qualquer um", value: "qualquer", icon: "🐾" },
    ],
    energia: [
      { label: "Baixo", value: "baixo", icon: "😴" },
      { label: "Moderado", value: "moderado", icon: "🚶" },
      { label: "Alto", value: "alto", icon: "🏃" },
    ],
  };

  // Função para rolar para o topo quando mudar de step
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [currentStep]);

  // Função para obter localização
  const obterLocalizacao = async () => {
    setLocationLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Permissão para acessar localização foi negada"
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setPreferencias({
        ...preferencias,
        coordenadas: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });

      Alert.alert("Sucesso", "Localização obtida com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Erro ao obter localização");
      console.error(error);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://192.168.0.104:3333/api/recomendation/gerar-recomendacoes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preferencias),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRecomendacoes(data);
        setShowRecommendations(true);
        Alert.alert("Sucesso", "Recomendações geradas com sucesso!");
      } else {
        const errorData = await response.text();
        console.error("Erro do servidor:", errorData);
        Alert.alert("Erro", "Erro ao gerar recomendações");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao conectar com o servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!preferencias.nome.trim()) {
          Alert.alert("Erro", "Por favor, preencha seu nome");
          return false;
        }
        if (preferencias.idade_usuario <= 0) {
          Alert.alert("Erro", "Por favor, informe uma idade válida");
          return false;
        }
        return true;
      case 2:
        if (
          preferencias.coordenadas.latitude === 0 &&
          preferencias.coordenadas.longitude === 0
        ) {
          Alert.alert("Erro", "Por favor, obtenha sua localização primeiro");
          return false;
        }
        return true;
      case 3:
      case 4:
      case 5:
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const openModal = (type: "especie" | "porte" | "energia" | "residencia") => {
    setModalType(type);
    setShowModal(true);
  };

  const selectOption = (value: string) => {
    switch (modalType) {
      case "residencia":
        setPreferencias({ ...preferencias, tipoResidencia: value });
        break;
      case "especie":
        setPreferencias({ ...preferencias, preferencias_especie: value });
        break;
      case "porte":
        setPreferencias({ ...preferencias, preferencias_porte: value });
        break;
      case "energia":
        setPreferencias({ ...preferencias, preferencias_nivel_energia: value });
        break;
    }
    setShowModal(false);
  };

  const getSelectedLabel = (type: string, value: string) => {
    const option = opcoes[type as keyof typeof opcoes]?.find(
      (opt) => opt.value === value
    );
    return option ? `${option.icon} ${option.label}` : value;
  };

  const renderCheckbox = (
    value: boolean,
    onPress: () => void,
    label: string
  ) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center mb-4 bg-white/20 p-4 rounded-2xl"
    >
      <View
        className={`w-6 h-6 border-2 border-white rounded-lg mr-3 items-center justify-center ${
          value ? "bg-white" : "bg-transparent"
        }`}
      >
        {value && <Text className="text-emerald-500 font-bold text-sm">✓</Text>}
      </View>
      <Text className="text-white flex-1 font-medium text-sm leading-5">
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderProgressBar = () => (
    <View className="mb-6 px-4">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-white font-semibold text-sm">
          Etapa {currentStep} de {totalSteps}
        </Text>
        <Text className="text-white font-semibold text-sm">
          {Math.round((currentStep / totalSteps) * 100)}%
        </Text>
      </View>
      <View className="w-full bg-white/30 rounded-full h-2">
        <View
          className="bg-white h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </View>
    </View>
  );

  const renderCustomSelect = (
    label: string,
    value: string,
    type: "especie" | "porte" | "energia" | "residencia"
  ) => (
    <View className="mb-4">
      <Text className="text-white font-semibold mb-2 text-base">{label}</Text>
      <TouchableOpacity
        onPress={() => openModal(type)}
        className="bg-white/20 rounded-xl p-3 flex-row justify-between items-center"
      >
        <Text className="text-white text-sm font-medium flex-1">
          {getSelectedLabel(type, value)}
        </Text>
        <Text className="text-white text-lg">▼</Text>
      </TouchableOpacity>
    </View>
  );

  // Resto dos métodos renderStep permanecem iguais, mas com ajustes de padding e tamanhos...
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View className="px-4">
            <View className="items-center mb-6">
              <Text className="text-3xl font-bold mb-2 text-white text-center">
                Informações Básicas
              </Text>
              <Text className="text-white text-center text-sm leading-5">
                Vamos começar conhecendo você melhor!
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-white font-semibold mb-2 text-base">
                Nome Completo *
              </Text>
              <TextInput
                value={preferencias.nome}
                onChangeText={(text) =>
                  setPreferencias({ ...preferencias, nome: text })
                }
                placeholder="Digite seu nome completo"
                className="bg-white/20 rounded-xl p-3 text-white text-sm"
                placeholderTextColor="rgba(255,255,255,0.7)"
              />
            </View>

            <View className="mb-4">
              <Text className="text-white font-semibold mb-2 text-base">
                Sua Idade *
              </Text>
              <TextInput
                value={preferencias.idade_usuario.toString()}
                onChangeText={(text) =>
                  setPreferencias({
                    ...preferencias,
                    idade_usuario: parseInt(text) || 0,
                  })
                }
                placeholder="Digite sua idade"
                keyboardType="numeric"
                className="bg-white/20 rounded-xl p-3 text-white text-sm"
                placeholderTextColor="rgba(255,255,255,0.7)"
              />
            </View>

            {renderCustomSelect(
              "Tipo de Residência",
              preferencias.tipoResidencia,
              "residencia"
            )}
          </View>
        );

      case 2:
        return (
          <View className="px-4">
            <View className="items-center mb-6">
              <Text className="text-3xl font-bold mb-2 text-white text-center">
                Localização
              </Text>
              <Text className="text-white text-center text-sm leading-5">
                Onde você está localizado?
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-white font-semibold mb-2 text-base">
                Sua Localização *
              </Text>
              <TouchableOpacity
                onPress={obterLocalizacao}
                disabled={locationLoading}
                className="bg-white rounded-xl py-3 px-4 mb-3"
                style={{ alignItems: "center" }}
              >
                {locationLoading ? (
                  <ActivityIndicator size="small" color="#10B981" />
                ) : (
                  <Text className="text-emerald-500 font-bold text-sm">
                    {preferencias.coordenadas.latitude !== 0
                      ? "📍 Atualizar Localização"
                      : "📍 Obter Minha Localização"}
                  </Text>
                )}
              </TouchableOpacity>

              {preferencias.coordenadas.latitude !== 0 && (
                <View className="bg-white/20 p-3 rounded-xl">
                  <Text className="text-white text-xs">
                    ✅ Localização obtida com sucesso!
                  </Text>
                </View>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-white font-semibold mb-2 text-base">
                Distância máxima (km)
              </Text>
              <TextInput
                value={preferencias.distancia_maxima.toString()}
                onChangeText={(text) =>
                  setPreferencias({
                    ...preferencias,
                    distancia_maxima: parseInt(text) || 0,
                  })
                }
                placeholder="Ex: 50"
                keyboardType="numeric"
                className="bg-white/20 rounded-xl p-3 text-white text-sm"
                placeholderTextColor="rgba(255,255,255,0.7)"
              />
            </View>

            <View className="mb-4">
              <Text className="text-white font-semibold mb-2 text-base">
                Horas sozinho por dia
              </Text>
              <TextInput
                value={preferencias.horasSozinhoPet.toString()}
                onChangeText={(text) =>
                  setPreferencias({
                    ...preferencias,
                    horasSozinhoPet: parseInt(text) || 0,
                  })
                }
                placeholder="Ex: 8"
                keyboardType="numeric"
                className="bg-white/20 rounded-xl p-3 text-white text-sm"
                placeholderTextColor="rgba(255,255,255,0.7)"
              />
            </View>
          </View>
        );

      case 3:
        return (
          <View className="px-4">
            <View className="items-center mb-6">
              <Text className="text-3xl font-bold mb-2 text-white text-center">
                Preferências do Pet
              </Text>
              <Text className="text-white text-center text-sm leading-5">
                Que tipo de pet você procura?
              </Text>
            </View>

            {renderCustomSelect(
              "Espécie Preferida",
              preferencias.preferencias_especie,
              "especie"
            )}
            {renderCustomSelect(
              "Porte Preferido",
              preferencias.preferencias_porte,
              "porte"
            )}
            {renderCustomSelect(
              "Nível de Energia",
              preferencias.preferencias_nivel_energia,
              "energia"
            )}
          </View>
        );

      case 4:
        return (
          <View className="px-4">
            <View className="items-center mb-6">
              <Text className="text-3xl font-bold mb-2 text-white text-center">
                Sobre Você
              </Text>
              <Text className="text-white text-center text-sm leading-5">
                Conte-nos mais sobre sua situação
              </Text>
            </View>

            {renderCheckbox(
              preferencias.possuiPets === 1,
              () =>
                setPreferencias({
                  ...preferencias,
                  possuiPets: preferencias.possuiPets === 1 ? 0 : 1,
                }),
              "🐾 Já possuo outros pets em casa"
            )}

            {renderCheckbox(
              preferencias.experienciaPrevia === 1,
              () =>
                setPreferencias({
                  ...preferencias,
                  experienciaPrevia:
                    preferencias.experienciaPrevia === 1 ? 0 : 1,
                }),
              "⭐ Tenho experiência prévia com pets"
            )}

            {renderCheckbox(
              preferencias.tem_criancas,
              () =>
                setPreferencias({
                  ...preferencias,
                  tem_criancas: !preferencias.tem_criancas,
                }),
              "👶 Tenho crianças em casa"
            )}

            {renderCheckbox(
              preferencias.aceita_necessidades_especiais,
              () =>
                setPreferencias({
                  ...preferencias,
                  aceita_necessidades_especiais:
                    !preferencias.aceita_necessidades_especiais,
                }),
              "❤️ Aceito pets com necessidades especiais"
            )}

            <View className="mt-6 mb-3">
              <Text className="text-white font-bold text-lg text-center mb-4">
                Preferências de Saúde
              </Text>
            </View>

            {renderCheckbox(
              preferencias.prefere_vacinado,
              () =>
                setPreferencias({
                  ...preferencias,
                  prefere_vacinado: !preferencias.prefere_vacinado,
                }),
              "💉 Prefiro pets vacinados"
            )}

            {renderCheckbox(
              preferencias.prefere_castrado,
              () =>
                setPreferencias({
                  ...preferencias,
                  prefere_castrado: !preferencias.prefere_castrado,
                }),
              "✂️ Prefiro pets castrados"
            )}

            {renderCheckbox(
              preferencias.prefere_vermifugado,
              () =>
                setPreferencias({
                  ...preferencias,
                  prefere_vermifugado: !preferencias.prefere_vermifugado,
                }),
              "🐛 Prefiro pets vermifugados"
            )}
          </View>
        );

      case 5:
        return (
          <View className="px-4">
            <View className="items-center mb-6">
              <Text className="text-3xl font-bold mb-2 text-white text-center">
                Socialização
              </Text>
              <Text className="text-white text-center text-sm leading-5">
                Como o pet deve se relacionar?
              </Text>
            </View>

            {renderCheckbox(
              preferencias.prefere_sociavel_caes,
              () =>
                setPreferencias({
                  ...preferencias,
                  prefere_sociavel_caes: !preferencias.prefere_sociavel_caes,
                }),
              "🐕 Prefiro pets sociáveis com cães"
            )}

            {renderCheckbox(
              preferencias.prefere_sociavel_gatos,
              () =>
                setPreferencias({
                  ...preferencias,
                  prefere_sociavel_gatos: !preferencias.prefere_sociavel_gatos,
                }),
              "🐱 Prefiro pets sociáveis com gatos"
            )}

            {renderCheckbox(
              preferencias.prefere_sociavel_criancas,
              () =>
                setPreferencias({
                  ...preferencias,
                  prefere_sociavel_criancas:
                    !preferencias.prefere_sociavel_criancas,
                }),
              "👶 Prefiro pets sociáveis com crianças"
            )}

            <View className="bg-white/20 p-4 rounded-2xl mt-6">
              <Text className="text-white font-bold text-lg mb-3 text-center">
                ✨ Resumo
              </Text>
              <View className="space-y-1">
                <Text className="text-white text-xs leading-4">
                  <Text className="font-semibold">👤 Nome:</Text>{" "}
                  {preferencias.nome}
                </Text>
                <Text className="text-white text-xs leading-4">
                  <Text className="font-semibold">🎂 Idade:</Text>{" "}
                  {preferencias.idade_usuario} anos
                </Text>
                <Text className="text-white text-xs leading-4">
                  <Text className="font-semibold">🏠 Residência:</Text>{" "}
                  {getSelectedLabel("residencia", preferencias.tipoResidencia)}
                </Text>
                <Text className="text-white text-xs leading-4">
                  <Text className="font-semibold">🐾 Espécie:</Text>{" "}
                  {getSelectedLabel(
                    "especie",
                    preferencias.preferencias_especie
                  )}
                </Text>
                <Text className="text-white text-xs leading-4">
                  <Text className="font-semibold">📏 Porte:</Text>{" "}
                  {getSelectedLabel("porte", preferencias.preferencias_porte)}
                </Text>
                <Text className="text-white text-xs leading-4">
                  <Text className="font-semibold">⚡ Energia:</Text>{" "}
                  {getSelectedLabel(
                    "energia",
                    preferencias.preferencias_nivel_energia
                  )}
                </Text>
                <Text className="text-white text-xs leading-4">
                  <Text className="font-semibold">📍 Distância:</Text>{" "}
                  {preferencias.distancia_maxima}km
                </Text>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={["#10B981", "#059669"]}
        className="flex-1 justify-center items-center"
      >
        <View className="bg-white/20 p-6 rounded-2xl items-center mx-4">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="mt-3 text-white font-semibold text-lg text-center">
            Gerando suas recomendações...
          </Text>
          <Text className="text-white text-center mt-1 text-sm">
            Isso pode levar alguns segundos
          </Text>
        </View>
      </LinearGradient>
    );
  }

  if (showRecommendations) {
    return (
      <View className="flex-1 bg-gray-50">
        <LinearGradient
          colors={["#10B981", "#059669"]}
          style={{ paddingTop: 48, paddingBottom: 16 }}
        >
          <View className="flex-row justify-between items-center px-4">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-white">
                Suas Recomendações
              </Text>
              <Text className="text-white text-sm">
                {recomendacoes.length} pets encontrados
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowRecommendations(false);
                setCurrentStep(1);
              }}
              className="bg-white px-3 py-2 rounded-xl"
            >
              <Text className="text-emerald-500 font-bold text-xs">
                Nova Busca
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView
          className="flex-1 px-3 pt-3"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {recomendacoes.length === 0 ? (
            <View className="flex-1 justify-center items-center py-16">
              <Text className="text-gray-500 text-base text-center mb-4 leading-5">
                Nenhuma recomendação encontrada.{"\n"}
                Tente ajustar suas preferências!
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowRecommendations(false);
                  setCurrentStep(1);
                }}
                className="bg-emerald-500 px-4 py-2 rounded-xl"
              >
                <Text className="text-white font-bold text-sm">
                  Tentar Novamente
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {recomendacoes.map((pet) => {
                let porte = "Desconhecido";
                if (pet.porte_pet_grande) porte = "Grande";
                else if (pet.porte_pet_medio) porte = "Médio";
                else if (pet.porte_pet_pequeno) porte = "Pequeno";

                const imageUrl =
                  pet.imagens && pet.imagens.length > 0
                    ? `${URL}${pet.imagens[0]}`
                    : "https://via.placeholder.com/150";

                return (
                  <TouchableOpacity
                    key={pet.pet_id}
                    onPress={() => router.push(`/pet-details/${pet.pet_id}`)}
                  >
                    <PetCard
                      nome={pet.nome}
                      imagem={imageUrl}
                      tags={[
                        pet.especie,
                        `${pet.idade_pet} anos`,
                        porte,
                        pet.cidade,
                        pet.estado,
                      ]}
                      descricao={pet.descricao}
                      matchPercentage={pet.probabilidade * 100}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#10B981", "#059669"]} className="flex-1">
      <View style={{ paddingTop: 48 }}>{renderProgressBar()}</View>

      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      >
        {renderStep()}
      </ScrollView>

      {/* Botões de navegação - FIXOS NA PARTE INFERIOR */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-transparent"
        style={{
          paddingBottom: 34, // Safe area para iPhone
          paddingTop: 12,
          paddingHorizontal: 16,
        }}
      >
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={prevStep}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-xl ${
              currentStep === 1 ? "bg-white/20" : "bg-white/30"
            }`}
            style={{ minWidth: 80 }}
          >
            <Text
              className={`font-bold text-sm text-center ${
                currentStep === 1 ? "text-white/50" : "text-white"
              }`}
            >
              Anterior
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={nextStep}
            className="bg-white px-4 py-2 rounded-xl"
            style={{ minWidth: 120 }}
          >
            <Text className="text-emerald-500 font-bold text-sm text-center">
              {currentStep === totalSteps ? "Gerar" : "Próximo"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal para seleção */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View
            className="bg-white rounded-t-2xl p-4"
            style={{ maxHeight: screenHeight * 0.6 }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-800">
                Selecione uma opção
              </Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text className="text-gray-500 text-xl">✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {opcoes[modalType]?.map((opcao) => (
                <TouchableOpacity
                  key={opcao.value}
                  onPress={() => selectOption(opcao.value)}
                  className="flex-row items-center p-3 border-b border-gray-100"
                >
                  <Text className="text-xl mr-3">{opcao.icon}</Text>
                  <Text className="text-sm text-gray-800 flex-1">
                    {opcao.label}
                  </Text>
                  {(modalType === "residencia" &&
                    preferencias.tipoResidencia === opcao.value) ||
                  (modalType === "especie" &&
                    preferencias.preferencias_especie === opcao.value) ||
                  (modalType === "porte" &&
                    preferencias.preferencias_porte === opcao.value) ||
                  (modalType === "energia" &&
                    preferencias.preferencias_nivel_energia === opcao.value) ? (
                    <Text className="text-emerald-500 font-bold text-base">
                      ✓
                    </Text>
                  ) : null}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

function PetCard({
  nome,
  imagem,
  tags,
  descricao,
  matchPercentage,
}: {
  nome: string;
  imagem: string;
  tags: string[];
  descricao: string;
  matchPercentage: number;
}) {
  return (
    <View className="bg-white rounded-2xl overflow-hidden shadow-lg mb-3">
      <View className="relative">
        <Image
          source={{ uri: imagem }}
          className="w-full h-40"
          resizeMode="cover"
        />
        <View className="absolute top-3 right-3 bg-emerald-500 px-3 py-1 rounded-full">
          <Text className="text-white font-bold text-xs">
            {matchPercentage.toFixed(0)}% match
          </Text>
        </View>
      </View>
      <View className="p-4">
        <Text className="text-xl font-bold text-gray-800 mb-1">{nome}</Text>
        <Text
          className="text-gray-600 mb-3 leading-4 text-sm"
          numberOfLines={2}
        >
          {descricao}
        </Text>
        <View className="flex-row flex-wrap">
          {tags.map((tag, index) => (
            <View
              key={index}
              className="bg-gray-100 px-2 py-1 rounded-full mr-1 mb-1"
            >
              <Text className="text-xs text-gray-700 font-medium">{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
