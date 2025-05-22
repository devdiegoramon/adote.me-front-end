import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

// importe o Dropdown
import { Dropdown } from "../../components/Dropdown"; // ajuste o caminho conforme a sua estrutura

export default function PetRegisterScreen() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("Cachorro");
  const [idade, setIdade] = useState("");
  const [porte, setPorte] = useState("Pequeno");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const [vacinado, setVacinado] = useState(false);
  const [castrado, setCastrado] = useState(false);
  const [sexo, setSexo] = useState("Macho");
  const [cor, setCor] = useState("");
  const [raca, setRaca] = useState("");

  const selecionarImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImagem(result.assets[0].uri);
    }
  };

  const handleCadastrar = () => {
    const novoPet = {
      nome,
      tipo,
      idade,
      porte,
      descricao,
      imagem,
      vacinado,
      castrado,
      sexo,
      cor,
      raca,
    };

    console.log("Pet cadastrado:", novoPet);
    alert("Pet cadastrado com sucesso!");
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <TouchableOpacity
        onPress={selecionarImagem}
        className="items-center mb-4"
      >
        {imagem ? (
          <Image source={{ uri: imagem }} className="w-full h-64 rounded-xl" />
        ) : (
          <View className="w-full h-64 bg-black/5 border border-dashed border-black/20 px-4 py-2 rounded-xl justify-center items-center">
            <Ionicons name="images" size={64} color="gray" />
            <Text className="text-black/50 mt-2">+ Selecionar imagem</Text>
          </View>
        )}
      </TouchableOpacity>

      <View className="gap-4">
        <View>
          <Text className="text-black font-medium mb-1">Nome</Text>
          <TextInput
            className="w-full border border-black/5 bg-black/5 rounded-xl px-4 py-4 placeholder:text-black/50"
            placeholder="Ex: Thor"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* Usando Dropdown */}
        <Dropdown
          title="Tipo"
          options={["Cachorro", "Gato", "Outro"]}
          selectedValue={tipo}
          onValueChange={setTipo}
        />

        <View>
          <Text className="text-black font-medium mb-1">Idade</Text>
          <TextInput
            className="w-full border border-black/5 bg-black/5 rounded-xl px-4 py-4 placeholder:text-black/50"
            placeholder="Ex: 2 anos"
            value={idade}
            onChangeText={setIdade}
          />
        </View>

        <Dropdown
          title="Porte"
          options={["Pequeno", "Médio", "Grande"]}
          selectedValue={porte}
          onValueChange={setPorte}
        />

        <Dropdown
          title="Sexo"
          options={["Macho", "Fêmea"]}
          selectedValue={sexo}
          onValueChange={setSexo}
        />

        <View>
          <Text className="text-black font-medium mb-1">Cor</Text>
          <TextInput
            className="w-full border border-black/5 bg-black/5 rounded-xl px-4 py-4 placeholder:text-black/50"
            placeholder="Ex: Branco com preto"
            value={cor}
            onChangeText={setCor}
          />
        </View>

        <View>
          <Text className="text-black font-medium mb-1">Raça</Text>
          <TextInput
            className="w-full border border-black/5 bg-black/5 rounded-xl px-4 py-4 placeholder:text-black/50"
            placeholder="Ex: Poodle"
            value={raca}
            onChangeText={setRaca}
          />
        </View>

        <View>
          <Text className="text-black font-medium mb-1">Descrição</Text>
          <TextInput
            multiline
            numberOfLines={4}
            className="w-full border border-black/5 bg-black/5 rounded-xl px-4 py-4 placeholder:text-black/50"
            placeholder="Ex: Muito brincalhão, adora correr..."
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>

        <View className="flex-row items-center justify-between w-full mt-2">
          <Text className="text-black font-bold text-base">Vacinado</Text>
          <Switch
            value={vacinado}
            onValueChange={setVacinado}
            thumbColor="#ffffff"
            trackColor={{ true: "#22c55e" }}
          />
        </View>

        <View className="flex-row items-center justify-between w-full mb-6">
          <Text className="text-black font-bold text-base">Castrado</Text>
          <Switch
            value={castrado}
            onValueChange={setCastrado}
            thumbColor="#ffffff"
            trackColor={{ true: "#22c55e" }}
          />
        </View>

        <TouchableOpacity
          className="bg-green rounded-xl px-4 py-4 w-full mb-8"
          onPress={handleCadastrar}
        >
          <Text className="text-white text-center font-bold text-xl">
            Cadastrar Pet
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
