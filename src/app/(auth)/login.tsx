import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../../../lib/api/login"; // ajuste o caminho conforme seu projeto

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isOng, setIsOng] = useState(false);

  const toggleSwitch = () => setIsOng((previous) => !previous);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const response = await login({ email, senha });
      console.log("Login bem-sucedido:", response);
      await AsyncStorage.setItem("token", response.token);

      // redireciona para rota diferente dependendo do tipo
      if (isOng) {
        router.replace("/(ong-tabs)/home");
      } else {
        router.replace("/(adotante-tabs)/home");
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", error.message || "Falha ao fazer login.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-6 py-6 gap-6">
      <Image
        source={require("../../../assets/logo.png")}
        className="w-64"
        resizeMode="contain"
      />

      <View className="items-center">
        <Text className="text-3xl font-bold text-black">
          Bem-vindo de volta!
        </Text>
        <Text className="text-xl text-gray-500">Faça login na sua conta</Text>
      </View>

      {/* Switch "Sou ONG" */}
      <View className="flex-row items-center justify-between w-full px-2">
        <Text className="text-black font-bold text-lg">Sou ONG</Text>
        <Switch
          value={isOng}
          onValueChange={toggleSwitch}
          thumbColor="#ffffff"
          trackColor={{ true: "#22c55e", false: "#ccc" }}
        />
      </View>

      <View className="w-full gap-4">
        <TextInput
          className="border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-4 placeholder:text-gray-400"
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          className="border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-4 placeholder:text-gray-400"
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        className="w-full bg-green rounded-xl px-4 py-4"
        onPress={handleLogin}
      >
        <Text className="text-white text-center font-bold text-xl">Entrar</Text>
      </TouchableOpacity>

      <Link
        href="/forgetpassword"
        className="text-green text-center font-bold px-4 py-4 w-full"
      >
        Esqueceu sua senha?
      </Link>

      <View className="flex-row items-center gap-4">
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
        <Text className="text-black">Não tem uma conta? </Text>
        <Link href="/register" className="text-green font-bold">
          Cadastre-se
        </Link>
      </View>
    </View>
  );
}
