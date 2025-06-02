import { SafeAreaView } from "react-native-safe-area-context";
import { mockOng } from "../mock/ong";
import { InfoCard } from "../../components/InfoCard";
import { useEffect, useState } from "react";
import { getLoggedProfile } from "../../../lib/api/user";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../../components/Button";
import { router } from "expo-router";
import { Alert } from "react-native";

type OngProfile = {
  nome: string;
  email: string;
  telefone: string;
  cnpj: string;
  endereco: string;
};

type Endereco = {
  logradouro: string;
  bairro: string;
  complemento: string;
};

function parseEndereco(endereco: Endereco, cidade: string, estado: string): string {
  return endereco.logradouro + ", " +
    endereco.complemento + ", " +
    endereco.bairro + ", " +
    cidade + " - " +
    estado;
}

export default function ProfileScreen() {
    const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair da conta.");
    }
  };

  const [profile, setProfile] = useState<OngProfile>();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user");
        const user = userJson ? JSON.parse(userJson) : null;
        console.log(user)
        setProfile({
          nome: user.nome,
          email: user.email,
          telefone: user.telefone,
          cnpj: user.cnpj,
          endereco: parseEndereco(user.endereco, user.cidade, user.estado),
        });
      } catch (error) {
        console.error("❌ Erro ao buscar profile:", error);
      }
    };

    fetchPets();
  }, []);


  if (profile == null) {
    return (
      <SafeAreaView className="flex-1 h-full bg-white items-center justify-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-4 gap-4" edges={["top"]}>
      <InfoCard label="Nome" value={profile.nome} />

      <InfoCard label="E-mail" value={profile.email} />

      <InfoCard label="Nº de Telefone" value={profile.telefone} />

      <InfoCard label="CNPJ" value={profile.cnpj} />

      <InfoCard label="Endereço" value={profile.endereco} />

      <Button text="Sair" onPress={handleLogout} />
    </SafeAreaView>
  );
}
