import { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type UserType = 'adotante' | 'ong';

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
  endereco: string;
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
    cnpj: ''
  });

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    console.log('Dados do formulário:', formData);
    router.push('/');
  }, [formData, router]);

  const renderUserTypeButton = (type: UserType, iconName: 'person' | 'home', label: string) => (
    <TouchableOpacity 
      className={`flex-1 p-4 rounded-xl border mx-1 flex-row justify-center items-center gap-2 ${
        userType === type 
          ? 'bg-emerald-500 border-emerald-500' 
          : 'bg-transparent border-gray-200'
      }`}
      onPress={() => setUserType(type)}
    >
      <Ionicons 
        name={iconName} 
        size={32} 
        color={userType === type ? '#ffffff' : '#666'} 
      />
      <Text className={`font-bold ${
        userType === type ? 'text-white' : 'text-gray-600'
      }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderInputField = (
    field: keyof FormData, 
    placeholder: string, 
    options: Partial<{
      keyboardType: 'default' | 'numeric' | 'email-address' | 'phone-pad';
      secureTextEntry: boolean;
      autoCapitalize: 'none' | 'sentences' | 'words' | 'characters';
    }> = {}
  ) => (
    <TextInput
      className="bg-gray-100 border border-gray-200 rounded-xl p-4 mb-4 text-base"
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={formData[field]}
      onChangeText={(text) => handleInputChange(field, text)}
      {...options}
    />
  );

  return (
    <ScrollView className="bg-white">
      <View className="flex-1 px-6 py-6 items-center justify-center min-h-screen">
        <Text className="text-2xl font-bold mb-2 text-gray-800">Crie sua conta</Text>
        <Text className="text-base text-gray-600 mb-8">Selecione o tipo de cadastro</Text>
        
        <View className="flex-row mb-6 w-full">
          {renderUserTypeButton('adotante', 'person', 'Sou Adotante')}
          {renderUserTypeButton('ong', 'home', 'Sou ONG')}
        </View>
        
        <View className="w-full">
          {renderInputField('nome', 'Nome')}
          {renderInputField('email', 'E-mail', { 
            keyboardType: 'email-address', 
            autoCapitalize: 'none' 
          })}
          
          {userType === 'ong' && renderInputField('cnpj', 'CNPJ', { 
            keyboardType: 'numeric' 
          })}
          
          {renderInputField('telefone', 'Telefone', { 
            keyboardType: 'phone-pad' 
          })}
          {renderInputField('endereco', 'Endereço')}
          {renderInputField('senha', 'Senha', { 
            secureTextEntry: true 
          })}
          {renderInputField('confirmarSenha', 'Confirmar Senha', { 
            secureTextEntry: true 
          })}
          
          <TouchableOpacity 
            onPress={() => router.replace('/(tabs)/home')}
            className="bg-emerald-500 py-4 rounded-xl items-center mb-4 shadow"
          >
            <Text className="text-white font-bold text-base">Cadastrar</Text>
          </TouchableOpacity>
        </View>
        
        <View className="flex-row items-center my-6 w-full">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-2 text-gray-500">ou</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>
        
        <TouchableOpacity className="flex-row items-center justify-center bg-gray-100 border border-gray-200 rounded-xl p-4 w-full mb-6">
          <View className="w-16 h-6 flex items-center justify-center mr-3">
            <Image
              source={require('../../assets/logo-govbr.png')}
              style={{ width: 64, height: 24 }}
              resizeMode="contain"
              className="mr-3"
            />
          </View>
          <Text className="text-gray-800 font-bold">Continuar com GOV.br</Text>
        </TouchableOpacity>
        
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