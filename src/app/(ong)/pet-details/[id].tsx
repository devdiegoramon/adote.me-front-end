import { View, Text, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../styles/colors";
import { mockPets } from "../../mock/pets";
import { Title } from "../../../components/Title"; // Importando o Title
import { Button } from "../../../components/Button";

export default function PetDetailsScreen() {
  const params = useLocalSearchParams<{ id: string }>();

  const pet = mockPets.find((p) => p.id === Number(params.id));

  if (!pet) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Pet não encontrado.</Text>
        <Link href="/" asChild>
          <Text className="text-blue-600 mt-4">Voltar para a lista</Text>
        </Link>
      </SafeAreaView>
    );
  }

  const descricao = `Olá! Eu sou o(a) ${pet.nome}, um(a) pet muito especial e amoroso(a). Estou procurando um lar cheio de carinho e cuidados. Gosto de brincar, receber atenção e sou ótimo(a) companheiro(a) para crianças e adultos. Venha me conhecer!`;

  const handleContato = () => {
    Alert.alert(
      "Contato",
      `Entrando em contato com a ONG "${pet.ong}" para adoção do(a) ${pet.nome}.`
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4" edges={[]}>
      <ScrollView className="my-4" showsVerticalScrollIndicator={false}>
        <Image
          source={pet.imagem}
          className="w-full h-64 rounded-xl mt-4 mb-6"
          resizeMode="cover"
        />

        <Title greeting={pet.nome} subtitle={pet.ong} />

        <View className="flex-row justify-center mb-6">
          <View className="flex-1 items-center">
            <Ionicons name="calendar" size={24} color={colors.green} />
            <Text className="text-gray-500 mt-1">Idade</Text>
            <Text className="text-lg font-semibold">{pet.idade}</Text>
          </View>
          <View className="flex-1 items-center">
            <Ionicons name="resize" size={24} color={colors.green} />
            <Text className="text-gray-500 mt-1">Porte</Text>
            <Text className="text-lg font-semibold">{pet.porte}</Text>
          </View>
          <View className="flex-1 items-center">
            <Ionicons name="location" size={24} color={colors.green} />
            <Text className="text-gray-500 mt-1">Local</Text>
            <Text className="text-lg font-semibold">{pet.local}</Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Descrição</Text>
          <Text className="text-gray-800">{descricao}</Text>
        </View>

        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Características</Text>
          <View className="flex-row flex-wrap gap-2">
            {pet.filtros.map((filtro, index) => (
              <View
                key={index}
                className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-full"
              >
                <Text className="text-gray-800 text-sm">{filtro}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mb-6 flex-row gap-8 justify-center">
          <View className="items-center">
            <Ionicons name="medkit" size={28} color={colors.green} />
            <Text className="text-green-600 font-semibold mt-1">
              Vacinas em dia
            </Text>
          </View>
          <View className="items-center">
            <Ionicons name="paw" size={28} color={colors.green} />
            <Text className="text-green-600 font-semibold mt-1">Castrado</Text>
          </View>
        </View>

        <Button text="Entrar em contato" onPress={handleContato} />
      </ScrollView>
    </SafeAreaView>
  );
}
