import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Logo } from '~/components/base/Logo';
import { Button } from '~/components/base/Button';
import { InputField } from '~/components/base/InputField';
import { SocialButton } from '~/components/base/SocialButton';
import { login } from '~/lib/api/login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();

  // Estados para armazenar os valores dos campos de email e senha
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
    <ScrollView>
      {/* Container principal da tela */}
      <View className="flex-1 bg-white px-6 py-6 items-center justify-center min-h-screen">
        
        {/* Componente de Logo - tamanho personalizado */}
        <Logo size={300} />

        {/* Títulos da tela */}
        <Text className="text-2xl font-bold mb-2 text-gray-800">Bem-vindo de volta!</Text>
        <Text className="text-base text-gray-600 mb-8">Faça login na sua conta</Text>

        {/* Seção do formulário */}
        <View className="w-full mb-6">
          {/* Campo de email */}
          <InputField
            value={email}
            onChange={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none" 
          />

          {/* Campo de senha (com texto oculto) */}
          <InputField
            value={senha}
            onChange={setSenha}
            placeholder="Senha"
            secureTextEntry  // Oculta o texto digitado
          />

          {/* Botão principal de login */}
          <Button onPress={handleLogin} variant="primary">
            Entrar
          </Button>

          {/* Link para recuperação de senha */}
          <Button
            onPress={() => router.push('/forgotpassword')}
            variant="borderless"
            className="mt-4" // Margem superior
          >
            Esqueceu sua senha?
          </Button>
        </View>

        {/* Divisor visual entre login normal e social */}
        <View className="flex-row items-center mb-6 w-full">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-2 text-gray-500">ou</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* Botão de login social (GOV.br) */}
        <SocialButton
          onPress={() => router.replace('/(tabs)/home')}
        />

        {/* Link para tela de cadastro */}
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