import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TextInput, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function NewPassword() {
  const router = useRouter();
  const { token } = useLocalSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  useEffect(() => {
    setHasMinLength(newPassword.length >= 8);
    setHasUpperCase(/[A-Z]/.test(newPassword));
    setHasLowerCase(/[a-z]/.test(newPassword));
    setHasNumber(/[0-9]/.test(newPassword));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(newPassword));
    setPasswordsMatch(newPassword === confirmPassword && newPassword !== '');
  }, [newPassword, confirmPassword]);

  const isPasswordValid = () => {
    return (
      hasMinLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      passwordsMatch
    );
  };

  const handleSubmit = async () => {
    if (!isPasswordValid()) {
      Alert.alert('Erro', 'Por favor, atenda a todos os requisitos de senha.');
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Sucesso', 
        'Sua senha foi alterada com sucesso!',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/login') }]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível alterar a senha. Tente novamente.');
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
        
        <Text className="text-2xl font-bold mb-2 text-gray-800">Criar nova senha</Text>
        <Text className="text-base text-gray-600 mb-8 text-center">
          Crie uma nova senha segura para sua conta
        </Text>

        {/* Campo nova senha */}
        <View className="w-full mb-4">
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-base"
            placeholder="Nova senha"
            placeholderTextColor="#999"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* Campo confirmar senha */}
        <View className="w-full mb-6">
          <TextInput
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-base"
            placeholder="Confirme a nova senha"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* Validação da senha */}
        <View className="w-full mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <Text className="text-sm font-medium mb-2 text-gray-700">Sua senha deve conter:</Text>
          
          {/* Regras de senha */}
          <View className="flex-row items-center mb-1">
            <View className={`w-2 h-2 rounded-full mr-2 ${hasMinLength ? 'bg-green-500' : 'bg-gray-300'}`} />
            <Text className={`text-sm ${hasMinLength ? 'text-green-500' : 'text-gray-500'}`}>
              No mínimo 8 caracteres
            </Text>
          </View>
          
          <View className="flex-row items-center mb-1">
            <View className={`w-2 h-2 rounded-full mr-2 ${hasUpperCase ? 'bg-green-500' : 'bg-gray-300'}`} />
            <Text className={`text-sm ${hasUpperCase ? 'text-green-500' : 'text-gray-500'}`}>
              Pelo menos 1 letra maiúscula
            </Text>
          </View>
          
          <View className="flex-row items-center mb-1">
            <View className={`w-2 h-2 rounded-full mr-2 ${hasLowerCase ? 'bg-green-500' : 'bg-gray-300'}`} />
            <Text className={`text-sm ${hasLowerCase ? 'text-green-500' : 'text-gray-500'}`}>
              Pelo menos 1 letra minúscula
            </Text>
          </View>
          
          <View className="flex-row items-center mb-1">
            <View className={`w-2 h-2 rounded-full mr-2 ${hasNumber ? 'bg-green-500' : 'bg-gray-300'}`} />
            <Text className={`text-sm ${hasNumber ? 'text-green-500' : 'text-gray-500'}`}>
              Pelo menos 1 número
            </Text>
          </View>
          
          <View className="flex-row items-center mb-1">
            <View className={`w-2 h-2 rounded-full mr-2 ${hasSpecialChar ? 'bg-green-500' : 'bg-gray-300'}`} />
            <Text className={`text-sm ${hasSpecialChar ? 'text-green-500' : 'text-gray-500'}`}>
              Pelo menos 1 caractere especial (!@#$%^&*)
            </Text>
          </View>
          
          <View className="flex-row items-center mb-1">
            <View className={`w-2 h-2 rounded-full mr-2 ${passwordsMatch ? 'bg-green-500' : 'bg-gray-300'}`} />
            <Text className={`text-sm ${passwordsMatch ? 'text-green-500' : 'text-gray-500'}`}>
              As senhas devem coincidir
            </Text>
          </View>
        </View>

        {/* Botão alterar senha */}
        <TouchableOpacity
          className={`bg-emerald-500 py-3 rounded-xl items-center justify-center w-full mb-4 ${
            !isPasswordValid() || isLoading ? 'opacity-70' : ''
          }`}
          activeOpacity={0.7}
          onPress={handleSubmit}
          disabled={!isPasswordValid() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">Alterar senha</Text>
          )}
        </TouchableOpacity>
        
        {/* Botão cancelar */}
        <TouchableOpacity
          className="py-3 rounded-xl items-center justify-center w-full"
          activeOpacity={0.7}
          onPress={() => !isLoading && router.replace('/login')}
          disabled={isLoading}
        >
          <Text className={`text-emerald-500 font-bold text-base ${
            isLoading ? 'opacity-50' : ''
          }`}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}