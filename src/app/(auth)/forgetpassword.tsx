import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormInput } from "../../components/FormInput";
import { Button } from "../../components/Button";
import { router } from "expo-router";

export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Decrementa o contador de cooldown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleRecovery = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu e-mail.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido.");
      return;
    }

    setIsLoading(true);

    try {
      // Simula envio de recuperação (substitua pela chamada real à API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert(
        "Email enviado",
        "Enviamos um link de recuperação para seu e-mail. Verifique sua caixa de entrada.",
        [{ text: "OK", onPress: () => router.back() }]
      );

      setCountdown(60);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Ocorreu um problema ao enviar o e-mail. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full items-center mb-8">
          <Image
            source={require("../../../assets/logo.png")}
            className="w-64"
            resizeMode="contain"
          />
        </View>

        <View className="items-center mb-6">
          <Text className="text-3xl font-bold text-black">Recuperar Senha</Text>
          <Text className="text-base text-gray-500 text-center mt-2">
            Informe seu e-mail para receber um link de redefinição.
          </Text>
        </View>

        <FormInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          className={`bg-emerald-500 py-3 rounded-xl items-center justify-center w-full mt-4 ${
            isLoading || countdown > 0 ? "opacity-70" : ""
          }`}
          activeOpacity={0.7}
          onPress={handleRecovery}
          disabled={isLoading || countdown > 0}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : countdown > 0 ? (
            <Text className="text-white font-bold text-base">
              Aguarde {countdown}s
            </Text>
          ) : (
            <Text className="text-white font-bold text-base">Enviar link</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="py-3 items-center justify-center w-full mt-4"
          activeOpacity={0.7}
          onPress={() => router.back()}
          disabled={isLoading}
        >
          <Text
            className={`text-emerald-500 font-bold text-base ${
              isLoading ? "opacity-50" : ""
            }`}
          >
            Voltar para login
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
