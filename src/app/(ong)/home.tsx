import { ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mockPets } from "../mock/pets";
import { mockOng } from "../mock/ong";
import { PetCard, Pet } from "../../components/PetCard";
import { SearchInput } from "../../components/SearchInput";
import { Title } from "../../components/Title";
import { getPetByOng } from "../../../lib/api/pets";
import AsyncStorage from "@react-native-async-storage/async-storage";


function parseData(data: any): Pet[] {

  return data.map((item: any) => {
    const filtros: string[] = [];

    if (item.especie === "GATO") {
      filtros.push("Gato");
    }
    if (item.especie === "CACHORO") {
      filtros.push("Cachorro");
    }
    if (item.castrado) {
      filtros.push("Castrado");
    }
    if (item.vacinado) {
      filtros.push("Vacinado");
    }
    if (item.vermifugado) {
      filtros.push("Vermifugado");
    }
    if (item.microchipado) {
      filtros.push("Microchipado");
    }
    if (item.sociavelCaes) {
      filtros.push("Bom com cães");
    }
    if (item.sociavelGatos) {
      filtros.push("Bom com gatos");
    }
    if (item.sociavelCriancas) {
      filtros.push("Bom com crianças");
    }
    if (item.nivelEnergia == "ALTO") {
      filtros.push("Energia Alta");
    }
    if (item.nivelEnergia == "MEDIO") {
      filtros.push("Tranquilo");
    }
    if (item.nivelEnergia == "BAIXO") {
      filtros.push("Calmo");
    }
    if (item.porte == "PEQUENO") {
      filtros.push("Pequeno");
    }
    if (item.porte == "MEDIO") {
      filtros.push("Médio porte");
    }
    if (item.porte == "GRANDE") {
      filtros.push("Grande porte");
    }

    console.log(item.imagens[0]);
    return ({
      id: item.pet_id,
      nome: item.nome,
      idade: item.idade + ' anos',
      imagem: item.imagens[0],
      filtros: filtros,
    } as Pet);
  });
}


export default function HomeOngScreen() {
  const [search, setSearch] = useState("");
  const [pets, setPets] = useState<Pet[]>();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const userId = await AsyncStorage.getItem("user_id");

        if (!userId) {
          console.error("❌ user_id não encontrado no AsyncStorage");
          return;
        }

        const data = await getPetByOng(parseInt(userId));
        setPets(parseData(data));
        console.log(pets);
      } catch (error) {
        console.error("❌ Erro ao buscar pets:", error);
      }
    };

    fetchPets();
  }, []);



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
      {!pets && (
        <SafeAreaView className="flex-1 h-full bg-white items-center justify-center">
          <ActivityIndicator size="large" />
        </SafeAreaView>
      )}

      {pets && (
        <PetCard pets={pets} showLocale={false} />
      )}

    </SafeAreaView>
  );
}
