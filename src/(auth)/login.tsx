import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Logo } from '~/components/base/Logo';
import { Button } from '~/components/base/Button';
import { InputField } from '~/components/base/InputField';
import { SocialButton } from '~/components/base/SocialButton';
import { login } from '~/lib/api/login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função para lidar com o processo de login
  const handleLogin = async () => {
    // Validação básica - verifica se os campos estão preenchidos
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await login({ email, senha });
      console.log('Login bem-sucedido:', response);
      await AsyncStorage.setItem('token', response.token);
    } catch (error: any) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', error.message || 'Falha ao fazer login.');
    }
    
    // Redireciona para a tela inicial após o "login"
    router.replace('/(tabs)/home');
  };

  return (
    <ScrollView className="bg-white">
      <View className="flex-1 px-6 py-6 items-center justify-center min-h-screen">
        
        {/* Logo */}
        <View className="items-center justify-center my-6">
          <Image
            source={require('../../assets/logo.png')}
            style={{ width: 250 }}
            resizeMode="contain"
          />
        </View>

        {/* Títulos */}
        <Text className="text-2xl font-bold mb-2 text-gray-800">Bem-vindo de volta!</Text>
        <Text className="text-base text-gray-600 mb-8">Faça login na sua conta</Text>

        {/* Formulário */}
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

          {/* Campo de senha */}
          <View className="mb-4">
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-base"
              placeholder="Senha"
              placeholderTextColor="#999"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
          </View>

          {/* Botão de login */}
          <TouchableOpacity
            className="bg-emerald-500 py-3 rounded-xl items-center justify-center w-full"
            activeOpacity={0.7}
            onPress={handleLogin}
          >
            <Text className="text-white font-bold text-base">Entrar</Text>
          </TouchableOpacity>

          {/* Botão de esqueci senha */}
          <TouchableOpacity
            className="py-3 rounded-xl items-center justify-center w-full mt-4"
            activeOpacity={0.7}
            onPress={() => router.push('/forgotpassword')}
          >
            <Text className="text-emerald-500 font-bold text-base">Esqueceu sua senha?</Text>
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
          className="w-full py-3 bg-gray-50 rounded-xl items-center justify-center flex-row border border-gray-200"
          activeOpacity={0.7}
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Image
            source={require("../../assets/logo-govbr.png")}
            style={{ width: 64, height: 24 }}
            resizeMode="contain"
            className="mr-3"
          />
          <Text className="text-gray-800 font-bold text-base">Entrar com gov.br</Text>
        </TouchableOpacity>

        {/* Link para cadastro */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600 mr-2">Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push('./signup')}>
            <Text className="text-emerald-500 font-bold">Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}