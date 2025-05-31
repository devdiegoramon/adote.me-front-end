import { SafeAreaView } from "react-native-safe-area-context";
import { mockAdotante } from "../mock/adotante";
import { InfoCard } from "../../components/InfoCard";

export default function ProfileScreen() {
  const user = mockAdotante;

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4 gap-6" edges={["top"]}>
      <InfoCard label="Nome" value={user.nome} />

      <InfoCard label="E-mail" value={user.email} />

      <InfoCard label="Nº de Telefone" value={user.telefone} />

      <InfoCard label="CPF" value={user.cpf} />

      <InfoCard label="Endereço" value={user.endereco} />
    </SafeAreaView>
  );
}
