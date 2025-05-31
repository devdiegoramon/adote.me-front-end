import { View, Text } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockPets } from "../mock/pets";
import { mockOng } from "../mock/ong";
import { PetCard } from "../../components/PetCard";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";
import { Title } from "../../components/Title";

export default function HomeOngScreen() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4 gap-6" edges={["top"]}>
      <Title
        greeting={`Olá, ${mockOng.nome}!`}
        subtitle="Gerencie seus pets e acompanhe solicitações"
      />

      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Procure pelo nome do pet..."
      />

      <PetCard pets={mockPets} />
    </SafeAreaView>
  );
}
