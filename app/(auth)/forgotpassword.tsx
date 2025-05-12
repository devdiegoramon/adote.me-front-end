import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TextInput, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleRecovery = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, informe seu email cadastrado.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Email enviado',
        'Enviamos um link de recuperação para seu email. Por favor, verifique sua caixa de entrada.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
      
      setCountdown(60);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um problema ao enviar o email. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <View className="flex-1 bg-white px-6 py-6 items-center justify-center min-h-screen">
        {/* Logo */}
        <View className="items-center justify-center my-6">
          <Image
            source={require('../../assets/logo.png')}
            style={{ width: 300 }}
            resizeMode="contain"
          />
        </View>
        
        <Text className="text-2xl font-bold mb-2 text-gray-800">Recuperar senha</Text>
        <Text className="text-base text-gray-600 mb-8 text-center">
          Informe o email associado à sua conta para receber as instruções
        </Text>

        <View className="w-full mb-6">
          {/* Campo de email */}
          <View className="mb-4">
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-base"
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Botão de envio */}
          <TouchableOpacity
            className={`bg-emerald-500 py-3 rounded-xl items-center justify-center w-full ${
              (isLoading || countdown > 0) ? 'opacity-70' : ''
            }`}
            activeOpacity={0.7}
            onPress={handleRecovery}
            disabled={isLoading || countdown > 0}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : countdown > 0 ? (
              <Text className="text-white font-bold text-base">Aguarde {countdown}s</Text>
            ) : (
              <Text className="text-white font-bold text-base">Enviar link</Text>
            )}
          </TouchableOpacity>
          
          {/* Botão de voltar */}
          <TouchableOpacity
            className="py-3 rounded-xl items-center justify-center w-full mt-4"
            activeOpacity={0.7}
            onPress={() => router.back()}
            disabled={isLoading}
          >
            <Text className={`text-emerald-500 font-bold text-base ${
              isLoading ? 'opacity-50' : ''
            }`}>
              Voltar para login
            </Text>
          </TouchableOpacity>

          {/* Botão de voltar */}
          <TouchableOpacity
            className="py-3 rounded-xl items-center justify-center w-full mt-4"
            activeOpacity={0.7}
            onPress={() => router.push('/(auth)/newpassword')}
            disabled={isLoading}
          >
            <Text className={`font-bold text-base ${
              isLoading ? 'opacity-50' : ''
            }`}>
              Teste Nova Senha
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divisor */}
        <View className="flex-row items-center mb-6 w-full">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-2 text-gray-500">ou</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* Botão gov.br */}
        <TouchableOpacity
          className={`w-full py-3 bg-gray-50 rounded-xl items-center justify-center flex-row border ${
            isLoading ? 'border-gray-300 opacity-70' : 'border-gray-200'
          }`}
          activeOpacity={0.7}
          onPress={() => !isLoading && router.replace('/(tabs)/home')}
          disabled={isLoading}
        >
          <Image
            source={require("../../assets/logo-govbr.png")}
            style={{ width: 64, height: 24 }}
            resizeMode="contain"
            className="mr-3"
          />
          <Text className={`font-bold text-base ${
            isLoading ? 'text-gray-500' : 'text-gray-800'
          }`}>
            Entrar com gov.br
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}