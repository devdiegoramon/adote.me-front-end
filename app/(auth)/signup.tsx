import { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '~/components/base/Button';
import { InputField } from '~/components/base/InputField';
import { SocialButton } from '~/components/base/SocialButton';
import { signup } from '~/lib/api/signup'
import type { SignupPayload } from '~/lib/api/signup';

// Tipos TypeScript para melhor organização do código
type UserType = 'adotante' | 'ong';  // Tipos de usuário suportados

// Interface para os dados do formulário
type FormData = {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
  endereco: string;
  cnpj: string;  // Campo específico para ONGs
};

export default function Signup() {
  const router = useRouter();
  
  // Estado para controlar o tipo de usuário selecionado
  const [userType, setUserType] = useState<UserType>('adotante');
  
  // Estado para armazenar todos os dados do formulário
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
    endereco: '',
    cnpj: '',
  });

  // Função otimizada para atualizar os campos do formulário
  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Função para validar todos os campos do formulário
  const validateForm = () => {
    const { nome, email, telefone, senha, confirmarSenha, endereco, cnpj } = formData;

    // Validação de campos obrigatórios
    if (!nome || !email || !telefone || !senha || !confirmarSenha || !endereco) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return false;
    }

    // Validação específica para ONGs
    if (userType === 'ong' && !cnpj) {
      Alert.alert("Erro", "Informe o CNPJ da ONG.");
      return false;
    }

    // Validação de confirmação de senha
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return false;
    }

    return true;
  };

  // Função para lidar com o envio do formulário
 const handleSubmit = useCallback(async () => {
  if (validateForm()) {
    try {
      const payload: SignupPayload =
  userType === 'ong'
    ? {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        senha: formData.senha,
        tipo_usuario: ['ong'], // ✅ Tupla literal
        ong_info: {
          nome_ong: formData.nome,
          cnpj: formData.cnpj,
          telefone_ong: formData.telefone,
          endereco: {
            rua: 'Rua Fictícia',
            numero: 123,
            cidade: 'Cidade Exemplo',
            estado: 'SP',
          },
          pets: [],
        },
      } as SignupPayload
    : {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        senha: formData.senha,
        tipo_usuario: ['adotante'], // ✅ Tupla literal
        adotante_info: {
          endereco: {
            rua: 'Rua Teste',
            numero: 999,
            cidade: 'Teste City',
            estado: 'EX',
          },
        },
      } as SignupPayload;




      const result = await signup(payload);

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  }
}, [formData, userType, router]);

  // Componente reutilizável para os botões de seleção de tipo de usuário
  const renderUserTypeButton = (type: UserType, iconName: 'person' | 'home', label: string) => (
    <TouchableOpacity
      className={`flex-1 p-4 rounded-xl border mx-1 flex-row justify-center items-center gap-2 ${
        userType === type ? 'bg-emerald-500 border-emerald-500' : 'bg-transparent border-gray-200'
      }`}
      onPress={() => setUserType(type)}
    >
      {/* Ícone do botão (muda de cor quando selecionado) */}
      <Ionicons name={iconName} size={32} color={userType === type ? '#fff' : '#666'} />
      
      {/* Texto do botão (muda de cor quando selecionado) */}
      <Text className={`font-bold ${userType === type ? 'text-white' : 'text-gray-600'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="bg-white">
      <View className="flex-1 px-6 py-6 items-center justify-center min-h-screen">
        {/* Títulos da tela */}
        <Text className="text-2xl font-bold mb-2 text-gray-800">Crie sua conta</Text>
        <Text className="text-base text-gray-600 mb-8">Selecione o tipo de cadastro</Text>

        {/* Seção de seleção do tipo de usuário */}
        <View className="flex-row mb-6 w-full">
          {renderUserTypeButton('adotante', 'person', 'Sou Adotante')}
          {renderUserTypeButton('ong', 'home', 'Sou ONG')}
        </View>

        {/* Formulário de cadastro */}
        <View className="w-full">
          {/* Campo de nome */}
          <InputField
            value={formData.nome}
            onChange={text => handleInputChange('nome', text)}
            placeholder="Nome"
          />
          
          {/* Campo de email */}
          <InputField
            value={formData.email}
            onChange={text => handleInputChange('email', text)}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          {/* Campo condicional de CNPJ (apenas para ONGs) */}
          {userType === 'ong' && (
            <InputField
              value={formData.cnpj}
              onChange={text => handleInputChange('cnpj', text)}
              placeholder="CNPJ"
              keyboardType="numeric"
            />
          )}
          
          {/* Campo de telefone */}
          <InputField
            value={formData.telefone}
            onChange={text => handleInputChange('telefone', text)}
            placeholder="Telefone"
            keyboardType="phone-pad"
          />
          
          {/* Campo de endereço */}
          <InputField
            value={formData.endereco}
            onChange={text => handleInputChange('endereco', text)}
            placeholder="Endereço"
          />
          
          {/* Campo de senha */}
          <InputField
            value={formData.senha}
            onChange={text => handleInputChange('senha', text)}
            placeholder="Senha"
            secureTextEntry
          />
          
          {/* Campo de confirmação de senha */}
          <InputField
            value={formData.confirmarSenha}
            onChange={text => handleInputChange('confirmarSenha', text)}
            placeholder="Confirmar Senha"
            secureTextEntry
          />

          {/* Botão principal de cadastro */}
          <Button onPress={handleSubmit}>Cadastrar</Button>
        </View>

        {/* Divisor visual entre cadastro normal e social */}
        <View className="flex-row items-center my-6 w-full">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-2 text-gray-500">ou</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* Botão de cadastro social (GOV.br) */}
        <SocialButton
          onPress={() => router.replace('/(tabs)/home')}
        />

        {/* Link para tela de login */}
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