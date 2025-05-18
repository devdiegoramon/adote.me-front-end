import { SafeAreaView, ScrollView, View, Text, Switch, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";

export default function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpfOuCnpj, setCpfOuCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isOng, setIsOng] = useState(false);

  const toggleSwitch = () => setIsOng(previous => !previous);

  const handleRegister = () => {
    if (!nome || !email || !cpfOuCnpj || !telefone || !endereco || !senha || !confirmarSenha) {
      alert("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    router.replace("/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 py-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center gap-6">
          <Image
            source={require("../../../assets/logo.png")}
            className="w-64"
            resizeMode="contain"
          />

          <View className="items-center">
            <Text className="text-3xl font-bold text-black">Crie sua conta</Text>
            <Text className="text-xl text-gray-500">Preencha os dados abaixo</Text>
          </View>

          <View className="flex-row items-center justify-between w-full">
            <Text className="text-black font-bold text-xl">Sou ONG</Text>
            <Switch
              value={isOng}
              onValueChange={toggleSwitch}
              thumbColor="#ffffff"
              trackColor={{ true: "#22c55e" }} // green-500
            />
          </View>

          <View className="w-full gap-4">
            <TextInput
              className="border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-4 placeholder:text-gray-400"
              placeholder={isOng ? "Nome da ONG" : "Nome completo"}
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              className="border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-4 placeholder:text-gray-400"
              placeholder={isOng ? "E-mail da instituição" : "E-mail"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              className="border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-4 placeholder:text-gray-400"
              placeholder={isOng ? "CNPJ" : "CPF"}
              value={cpfOuCnpj}
              onChangeText={setCpfOuCnpj}
              keyboardType="numeric"
            />

            <TextInput
              className="border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-4 placeholder:text-gray-400"
              placeholder="Telefone"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />

            <TextInput
              className="border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-4 placeholder:text-gray-400"
              placeholder="Endereço"
              value={endereco}
              onChangeText={setEndereco}
            />

            <TextInput
              className="border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-4 placeholder:text-gray-400"
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />

            <TextInput
              className="border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-4 placeholder:text-gray-400"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className="w-full bg-green rounded-xl px-4 py-4"
            onPress={handleRegister}
          >
            <Text className="text-white text-center font-bold text-xl">
              Cadastrar
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center w-full gap-4">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="text-gray-500 font-medium">ou</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          <TouchableOpacity className="w-full border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-4 flex-row items-center justify-center gap-4">
            <Image
              source={require("../../../assets/govbr-logo.png")}
              className="w-16 h-6"
              resizeMode="contain"
            />
            <Text className="text-black font-bold">Entrar com gov.br</Text>
          </TouchableOpacity>

          <View className="flex-row">
            <Text className="text-black">Já tem uma conta? </Text>
            <Link href="/login" className="text-green font-bold">
              Entrar
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
