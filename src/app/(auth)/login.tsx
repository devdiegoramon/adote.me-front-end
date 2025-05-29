import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link, router } from "expo-router";
import { colors } from "../../styles/colors";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isOng, setIsOng] = useState(false);

  const toggleSwitch = () => setIsOng((previous) => !previous);

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Senha:", senha);
    console.log("Sou ONG:", isOng);

    if (isOng) {
      router.replace("/(ong)/home");
    } else {
      router.replace("/(adotante)/home");
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-6">
      <Image
        source={require("../../../assets/logo.png")}
        className="w-64 m-12"
        resizeMode="contain"
      />

      <View className="items-center mb-4">
        <Text className="text-3xl font-bold text-black">
          Bem-vindo de volta!
        </Text>
        <Text className="text-xl text-gray-500">Faça login na sua conta</Text>
      </View>

      <View
        className="flex-row items-center justify-between w-full px-2 mb-4"
        onTouchEnd={toggleSwitch}
      >
        <Text className="text-black font-bold text-lg">Sou ONG</Text>
        <Switch
          value={isOng}
          thumbColor={colors.white}
          trackColor={{ true: colors.green }}
          pointerEvents="none"
        />
      </View>

      <TextInput
        className="border-2 border-gray-200 bg-gray-50 rounded-xl p-4 placeholder:text-gray-400 w-full mb-4"
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        className="border-2 border-gray-200 bg-gray-50 rounded-xl p-4 placeholder:text-gray-400 w-full mb-4"
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity
        className="w-full bg-green rounded-xl p-4 mb-4"
        onPress={handleLogin}
      >
        <Text className="text-white text-center font-bold text-xl">Entrar</Text>
      </TouchableOpacity>

      <Link
        href="/forgetpassword"
        className="text-green text-center font-bold p-4 w-full mb-4"
      >
        Esqueceu sua senha?
      </Link>

      <View className="flex-row items-center gap-4 mb-4">
        <View className="flex-1 h-px bg-gray-200" />
        <Text className="text-gray-500 font-medium">ou</Text>
        <View className="flex-1 h-px bg-gray-200" />
      </View>

      <TouchableOpacity className="w-full border-2 border-gray-200 bg-gray-50 rounded-xl p-4 placeholder:text-gray-400 flex-row items-center justify-center gap-4 mb-4">
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
    </SafeAreaView>
  );
}
