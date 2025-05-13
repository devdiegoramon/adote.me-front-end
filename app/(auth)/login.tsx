import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native'
import { useRouter } from 'expo-router'

export default function LoginScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleLogin = () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.')
      return
    }

    // Futuro: autenticação real
    router.replace('/(tabs)/home')
  }

  return (
    <ScrollView className="flex-1 bg-white" keyboardShouldPersistTaps="handled">
      <View className="flex-1 justify-center px-6 py-10 min-h-screen">

        {/* Logo */}
        <View className="items-center mb-8">
          <Image
            source={require('../../assets/logo.png')}
            resizeMode="contain"
            style={{ width: 220, height: 80 }}
          />
        </View>

        {/* Texto de boas-vindas */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-center text-gray-800 mb-1">
            Bem-vindo de volta!
          </Text>
          <Text className="text-base text-center text-gray-600">
            Faça login na sua conta
          </Text>
        </View>

        {/* Formulário */}
        <View className="space-y-4 mb-6">
          <TextInput
            className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-800"
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-800"
            placeholder="Senha"
            placeholderTextColor="#888"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-emerald-500 rounded-xl py-3 items-center"
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-base">Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/forgotpassword')}
            className="items-center"
            activeOpacity={0.8}
          >
            <Text className="text-emerald-500 font-medium">Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        {/* Divisor */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-3 text-gray-500 text-sm">ou</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* Login com gov.br */}
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)/home')}
          className="flex-row items-center justify-center bg-gray-50 border border-gray-300 rounded-xl py-3"
          activeOpacity={0.85}
        >
          <Image
            source={require('../../assets/logo-govbr.png')}
            resizeMode="contain"
            style={{ width: 64, height: 24, marginRight: 8 }}
          />
          <Text className="text-gray-800 font-semibold text-base">Entrar com gov.br</Text>
        </TouchableOpacity>

        {/* Link de cadastro */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text className="text-emerald-500 font-bold ml-2">Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
