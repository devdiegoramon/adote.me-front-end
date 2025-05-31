import { SafeAreaView } from "react-native-safe-area-context";
import { InfoCard } from "../../components/InfoCard";
import { mockOng } from "../mock/ong";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 gap-4" edges={["top"]}>
      <InfoCard label="Nome" value={mockOng.nome} />

      <InfoCard label="E-mail" value={mockOng.email} />

      <InfoCard label="Nº de Telefone" value={mockOng.telefone} />

      <InfoCard label="CNPJ" value={mockOng.cnpj} />

      <InfoCard label="Endereço" value={mockOng.endereco} />
    </SafeAreaView>
  );
}
