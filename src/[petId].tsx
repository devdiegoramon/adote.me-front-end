import { View, Text, Image, Button, ScrollView } from "react-native";
import {  useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getPetById } from '../../lib/api/pets'; // Supondo que você tenha essa função

const URL = 'http://localhost:3000/download/';

// Tipagem do Pet
type Pet = {
    _id: string;
    nome: string;
    especie: string;
    idade: number;
    porte: string;
    cidade: string;
    estado: string;
    imagens?: string[];
    foto_url: string;
  };

  
export default function PetDetails() {
  const [pet, setPet] = useState<any>(null);
  const router = useRouter();
  const { petId } =  useLocalSearchParams(); // pegando o ID do pet da URL
  // garantir que é uma string
  if (typeof petId !== 'string') return null;

  useEffect(() => {
    const fetchPetDetails = async () => {
      if (!petId) return;

      try {
        const data = await getPetById(petId); // Função para pegar o pet pelo ID
        setPet(data); // Atualiza o estado com os dados do pet
      } catch (error) {
        console.error("❌ Erro ao buscar detalhes do pet:", error);
      }
    };

    fetchPetDetails();
  }, [petId]); // Só faz a requisição quando o petId mudar

  if (!pet) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Image
        source={{ uri: pet.foto_url
    ? `${URL}${pet.foto_url}`
    : 'https://via.placeholder.com/150'}}
        style={{ width: "100%", height: 300 }}
        resizeMode="cover"
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 8 }}>{pet.nome}</Text>
      <Text style={{ fontSize: 16, color: "gray" }}>
        {pet.especie} - {pet.idade} anos
      </Text>

      <Text style={{ marginTop: 16 }}>Tags:</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {pet.personalidades.map((tag: string, index: number) => (
          <Text
            key={index}
            style={{ backgroundColor: "#e0e0e0", padding: 8, borderRadius: 12 }}
          >
            {tag}
          </Text>
        ))}
      </View>

      <Text style={{ marginTop: 16 }}>
        Local de Retirada: {pet.cidade} - {pet.estado}
      </Text>
      <Text style={{ marginTop: 16 }}>
        Descrição: {pet.descricao}
      </Text>
      <Button
        title="Solicitar Adoção"
        onPress={() => alert("Um e-mail foi enviado para confirmação, Obrigado!")}
      />
    </ScrollView>
  );
}