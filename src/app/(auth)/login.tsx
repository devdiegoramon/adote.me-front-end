import { View, Text, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link, router } from "expo-router";
import { Divisor } from "../../components/Divisor";
import { SocialButton } from "../../components/SocialButton";
import { FormInput } from "../../components/FormInput";
import { Button } from "../../components/Button";
import { FormSwitch } from "../../components/FormSwitch";
import { login } from "../../../lib/api/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const response = await login({ email, senha });
      console.log("Login bem-sucedido:", response);

      // Armazena o token
      await AsyncStorage.setItem("token", response.token);

      // Armazena o user como string JSON
      await AsyncStorage.setItem("user", JSON.stringify(response.user));

    } catch (error: any) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", error.message || "Falha ao fazer login.");
    }

    const userData = await AsyncStorage.getItem("user");

      if (!userData) {
        console.error("Usuário não encontrado no AsyncStorage");
        return;
      }

      const user = JSON.parse(userData);

      if (user.tipo === 'ONG') {
        router.replace("/(ong)/home");
      } else {
        router.replace("/(adotante)/home");
      }
    };

  return (
    <SafeAreaView className="flex-1 p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full items-center">
          <Image
            source={require("../../../assets/logo.png")}
            className="w-64 mb-12"
            resizeMode="contain"
          />
        </View>

        <View className="items-center mb-4">
          <Text className="text-3xl font-bold text-black">
            Bem-vindo de volta!
          </Text>
          <Text className="text-xl text-gray-500">Faça login na sua conta</Text>
        </View>
  

        <FormInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite sua senha"
          secureTextEntry
        />

        <Button text="Entrar" onPress={handleLogin} />

        <Link
          href="/forgetpassword"
          className="text-green text-center font-bold p-4 w-full mb-4"
        >
          Esqueceu sua senha?
        </Link>

        <Divisor />

        <SocialButton />

        <View className="flex-row w-full justify-center">
          <Text className="text-black">Não tem uma conta? </Text>
          <Link href="/register" className="text-green font-bold">
            Cadastre-se
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
