import { SafeAreaView } from "react-native-safe-area-context";
import { InfoCard } from "../../components/InfoCard";
import { useEffect, useState } from "react";
import { getLoggedProfile } from "../../../lib/api/user";
import { ActivityIndicator } from "react-native";

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
  const [profile, setProfile] = useState<OngProfile>();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getLoggedProfile();
        setProfile({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          cnpj: data.cnpj,
          endereco: parseEndereco(data.endereco, data.cidade, data.estado),
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
    </SafeAreaView>
  );
}
