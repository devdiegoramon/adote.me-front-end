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
import { API_BASE_URL } from '../../lib/api';


interface Pet {
  id: number;
  nome: string;
  idade: string;
  imagem: ImageSourcePropType;
  filtros: string[];
  ong: string;
  local: string;
  foto_url: string;
}

interface PetCardProps {
  pets: Pet[];
}

export function PetCard({ pets }: PetCardProps) {
  const renderPetItem = ({ item: pet }: { item: Pet }) => {
    const imageUrl = pet.foto_url
      ? `${API_BASE_URL}/download/${pet.foto_url}`
      : 'https://via.placeholder.com/150';

    console.log('Imagem do pet:', imageUrl);

    return (
      <Link href={`pet-details/${pet.id}`} asChild>
        <TouchableOpacity className="bg-gray-50 border border-gray-200 rounded-xl mb-4 p-4 flex-row gap-4">
          <Image
            source={{ uri: imageUrl }}
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

            <View className="flex-row items-center gap-2">
              <Ionicons name="home" size={16} color={colors.green} />
              <Text className="text-gray-500 text-sm">{pet.ong}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Ionicons name="location" size={16} color={colors.green} />
              <Text className="text-gray-500 text-sm">{pet.local}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <FlatList
      data={pets}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={renderPetItem}
    />
  );
}
