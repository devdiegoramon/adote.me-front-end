import React from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Text,
  ImageSourcePropType,
} from "react-native";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../styles/colors";

export interface Pet {
  id: number;
  nome: string;
  idade: string;
  imagem: ImageSourcePropType;
  filtros: string[];
  ong: string;
  local: string;
}

type PetCardProps = {
  pets: Pet[];
  showLocale?: Boolean;
}

export function PetCard(data: PetCardProps) {
  const showLocale = data.showLocale ?? true;

  const renderPetItem = ({ item: pet }: { item: Pet }) => (
    <Link href={`pet-details/${pet.id}`} asChild>
      <TouchableOpacity className="bg-gray-50 border border-gray-200 rounded-xl mb-4 p-4 flex-row gap-4">
        <Image
          source={pet.imagem}
          className="w-36 h-36 rounded-xl"
          resizeMode="cover"
        />

        <View className="flex-1 gap-2">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              <Text className="text-lg font-bold text-black">{pet.nome}</Text>
              <Text className="text-gray-500">• {pet.idade}</Text>
            </View>
          </View>

          <View className="flex-row flex-wrap gap-2">
            {pet.filtros.map((filtro, index) => (
              <View
                key={index}
                className="bg-gray-100 border border-gray-200 px-2 py-1 rounded-full"
              >
                <Text className="text-black text-xs">{filtro}</Text>
              </View>
            ))}
          </View>

          {
            showLocale && <View className="flex-row items-center gap-2">
              <Ionicons name="home" size={16} color={colors.green} />
              <Text className="text-gray-500 text-sm">{pet.ong}</Text>
            </View>
          }
          {
            showLocale && <View className="flex-row items-center gap-2">
              <Ionicons name="location" size={16} color={colors.green} />
              <Text className="text-gray-500 text-sm">{pet.local}</Text>
            </View>
          }

        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <FlatList
      data={data.pets}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={renderPetItem}
    />
  );
}
