import { useState } from "react";
import { mockPets } from "../mock/pets";
import { PetCard } from "../../components/PetCard";
import { SearchInput } from "../../components/SearchInput";
import { Title } from "../../components/Title";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeAdotanteScreen() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4 gap-6" edges={["top"]}>
      <Title
        greeting="Olá, Rodrigo"
        subtitle="Aqui estão alguns pets que combinam com você"
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
