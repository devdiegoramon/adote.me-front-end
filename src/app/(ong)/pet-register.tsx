import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import { Dropdown } from "../../components/Dropdown";
import { FormInput } from "../../components/FormInput";
import { FormSwitch } from "../../components/FormSwitch";
import { Button } from "../../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../styles/colors";

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
    <SafeAreaView className="flex-1 bg-white px-4" edges={[]}>
      <ScrollView className="my-4" showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={selecionarImagem}
          className="items-center mb-4"
        >
          {imagem ? (
            <Image
              source={{ uri: imagem }}
              className="w-full h-64 rounded-xl border-2 border-gray-200"
            />
          ) : (
            <View className="w-full h-64 bg-gray-50 border-2 border-gray-200 rounded-xl justify-center items-center">
              <Ionicons name="images" size={48} color={colors.gray[400]} />
              <Text className="text-white bg-gray-400 mt-2 font-medium px-4 py-2 rounded-xl">
                + Selecionar imagem
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <View className="gap-4">
          <FormInput
            label="Nome"
            placeholder="Ex: Thor"
            value={nome}
            onChangeText={setNome}
          />

          <Dropdown
            title="Tipo"
            options={["Cachorro", "Gato", "Outro"]}
            selectedValue={tipo}
            onValueChange={setTipo}
          />

          <FormInput
            label="Idade"
            placeholder="Ex: 2 anos"
            value={idade}
            onChangeText={setIdade}
          />

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

          <FormInput
            label="Cor"
            placeholder="Ex: Branco com preto"
            value={cor}
            onChangeText={setCor}
          />

          <FormInput
            label="Raça"
            placeholder="Ex: Poodle"
            value={raca}
            onChangeText={setRaca}
          />

          <FormInput
            label="Descrição"
            placeholder="Ex: Muito brincalhão, adora correr..."
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <FormSwitch
            label="Vacinado"
            value={vacinado}
            onValueChange={setVacinado}
          />

          <FormSwitch
            label="Castrado"
            value={castrado}
            onValueChange={setCastrado}
          />

          <Button text="Cadastrar Pet" onPress={handleCadastrar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
