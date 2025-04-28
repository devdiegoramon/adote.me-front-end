import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from 'expo-router';
import { Logo } from "../../components/Logo";

export default function Login() {
  const router = useRouter();

  return (
    <ScrollView>
      <View className="flex-1 bg-white px-6 py-6 items-center justify-center min-h-screen">
        {/* Logo */}
        <Logo size={300} />
        
        {/* Título */}
        <Text className="text-2xl font-bold mb-2 text-gray-800">Bem-vindo de volta!</Text>
        <Text className="text-base text-gray-600 mb-8">Faça login na sua conta</Text>
        
        {/* Formulário */}
        <View className="w-full mb-6">
          <TextInput
            className="bg-gray-100 border border-gray-200 rounded-xl p-4 mb-4 text-base"
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            className="bg-gray-100 border border-gray-200 rounded-xl p-4 mb-4 text-base"
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
          />
          
          <TouchableOpacity 
            onPress={() => router.replace('/(tabs)/home')}
            className="bg-emerald-500 py-4 rounded-xl items-center mb-4 shadow"
          >
            <Text className="text-white font-bold text-base">Entrar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center">
            <Text className="text-emerald-500 font-bold">Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>
        
        {/* Divisor */}
        <View className="flex-row items-center my-6 w-full">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-2 text-gray-500">ou</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>
        
        {/* Login Social */}
        <TouchableOpacity className="flex-row items-center justify-center bg-gray-100 border border-gray-200 rounded-xl p-4 w-full mb-6">
          <Image
            source={require('../../assets/logo-govbr.png')}
            style={{ width: 64, height: 24 }}
            resizeMode="contain"
            className="mr-3"
          />
          <Text className="text-gray-800 font-bold">Continuar com GOV.br</Text>
        </TouchableOpacity>
        
        {/* Cadastro */}
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