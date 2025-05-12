import { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput, Image } from "react-native";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Tipos TypeScript
type UserType = 'adotante' | 'ong';

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
  endereco: string;
  cpf: string;
  cnpj: string;
};

export default function Signup() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>('adotante');
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
    endereco: '',
    cpf: '',
    cnpj: '',
  });

  // Funções de manipulação
  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const validateForm = () => {
    const { nome, email, telefone, senha, confirmarSenha, endereco, cpf, cnpj } = formData;

    if (!nome || !email || !telefone || !senha || !confirmarSenha || !endereco) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return false;
    }

    if (userType === 'adotante' && !cpf) {
      Alert.alert("Erro", "Informe o seu CPF.");
      return false;
    }

    if (userType === 'ong' && !cnpj) {
      Alert.alert("Erro", "Informe o CNPJ da ONG.");
      return false;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return false;
    }

    return true;
  };

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      router.replace('/(tabs)/home');
    }
  }, [formData, router]);

  // Renderização
  return (
    <ScrollView className="bg-white">
      <View className="flex-1 px-6 py-6 my-6 items-center justify-center min-h-screen">
        {/* Títulos */}
        <Text className="text-2xl font-bold mb-2 text-gray-800">Crie sua conta</Text>
        <Text className="text-base text-gray-600 mb-8">Selecione o tipo de cadastro</Text>

        {/* Seletor de tipo de usuário */}
        <View className="flex-row mb-6 w-full">
          <TouchableOpacity
            className={`flex-1 p-4 rounded-xl border mx-1 flex-row justify-center items-center gap-2 ${
              userType === 'adotante' ? 'bg-emerald-500 border-emerald-500' : 'bg-transparent border-gray-200'
            }`}
            onPress={() => setUserType('adotante')}
          >
            <Ionicons name="person" size={24} color={userType === 'adotante' ? '#fff' : '#666'} />
            <Text className={`font-bold ${userType === 'adotante' ? 'text-white' : 'text-gray-600'}`}>
              Sou Adotante
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 p-4 rounded-xl border mx-1 flex-row justify-center items-center gap-2 ${
              userType === 'ong' ? 'bg-emerald-500 border-emerald-500' : 'bg-transparent border-gray-200'
            }`}
            onPress={() => setUserType('ong')}
          >
            <Ionicons name="home" size={24} color={userType === 'ong' ? '#fff' : '#666'} />
            <Text className={`font-bold ${userType === 'ong' ? 'text-white' : 'text-gray-600'}`}>
              Sou ONG
            </Text>
          </TouchableOpacity>
        </View>

        {/* Formulário */}
        <View className="w-full">
          {/* Nome */}
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-base"
            placeholder="Nome"
            value={formData.nome}
            onChangeText={text => handleInputChange('nome', text)}
          />

          {/* Email */}
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-base"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={text => handleInputChange('email', text)}
          />

          {/* CPF/CNPJ */}
          {userType === 'adotante' ? (
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-base"
              placeholder="CPF"
              keyboardType="numeric"
              value={formData.cpf}
              onChangeText={text => handleInputChange('cpf', text)}
            />
          ) : (
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-base"
              placeholder="CNPJ"
              keyboardType="numeric"
              value={formData.cnpj}
              onChangeText={text => handleInputChange('cnpj', text)}
            />
          )}

          {/* Telefone */}
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-base"
            placeholder="Telefone"
            keyboardType="phone-pad"
            value={formData.telefone}
            onChangeText={text => handleInputChange('telefone', text)}
          />

          {/* Endereço */}
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-base"
            placeholder="Endereço"
            value={formData.endereco}
            onChangeText={text => handleInputChange('endereco', text)}
          />

          {/* Senha */}
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-base"
            placeholder="Senha"
            secureTextEntry
            value={formData.senha}
            onChangeText={text => handleInputChange('senha', text)}
          />

          {/* Confirmar Senha */}
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-base"
            placeholder="Confirmar Senha"
            secureTextEntry
            value={formData.confirmarSenha}
            onChangeText={text => handleInputChange('confirmarSenha', text)}
          />

          {/* Botão de Cadastro */}
          <TouchableOpacity
            className="bg-emerald-500 py-3 rounded-xl items-center justify-center w-full"
            activeOpacity={0.7}
            onPress={handleSubmit}
          >
            <Text className="text-white font-bold text-base">Cadastrar</Text>
          </TouchableOpacity>
        </View>

        {/* Divisor */}
        <View className="flex-row items-center my-6 w-full">
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

        {/* Link para login */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600 mr-2">Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push('./login')}>
            <Text className="text-emerald-500 font-bold">Faça login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}