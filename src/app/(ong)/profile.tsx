import { SafeAreaView } from "react-native-safe-area-context";
import { mockOng } from "../mock/ong";
import { InfoCard } from "../../components/InfoCard";
import { Button } from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";

export default function ProfileScreen() {
  const user = mockOng;

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair da conta.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4 gap-6" edges={["top"]}>
      <InfoCard label="Nome" value={user.nome} />

      <InfoCard label="E-mail" value={user.email} />

      <InfoCard label="Nº de Telefone" value={user.telefone} />

      <InfoCard label="CPF" value={user.cnpj} />

      <InfoCard label="Endereço" value={user.endereco} />

      <Button text="Sair" onPress={handleLogout} />
    </SafeAreaView>
  );
}
