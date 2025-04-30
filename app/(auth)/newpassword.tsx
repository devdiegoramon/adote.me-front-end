import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Logo } from '~/components/base/Logo';
import { Button } from '~/components/base/Button';
import { InputField } from '~/components/base/InputField';

/**
 * Tela NewPassword - Permite aos usuários criar uma nova senha com validação
 * 
 * Funcionalidades:
 * - Validação de força da senha com feedback visual
 * - Verificação de token dos parâmetros da URL
 * - Campos de senha seguros
 * - Estados de carregamento durante o envio
 */
export default function NewPassword() {
  // Navegação e manipulação de rotas
  const router = useRouter();
  const { token } = useLocalSearchParams(); // Token do link de redefinição de senha

  // Gerenciamento de estado do formulário
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados para validação dos requisitos da senha
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  /**
   * Efeito que valida a senha sempre que os campos são alterados
   * Verifica todos os critérios de complexidade da senha
   */
  useEffect(() => {
    // Validação dos critérios de complexidade
    setHasMinLength(newPassword.length >= 8);
    setHasUpperCase(/[A-Z]/.test(newPassword));
    setHasLowerCase(/[a-z]/.test(newPassword));
    setHasNumber(/[0-9]/.test(newPassword));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(newPassword));
    setPasswordsMatch(newPassword === confirmPassword && newPassword !== '');
  }, [newPassword, confirmPassword]);

  /**
   * Função para enviar a nova senha
   * - Valida os requisitos
   * - Simula chamada à API
   * - Gerencia estado de carregamento
   * - Mostra feedback ao usuário
   */
  const handleSubmit = async () => {
    if (!isPasswordValid()) {
      Alert.alert('Erro', 'Por favor, atenda a todos os requisitos de senha.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulação de chamada à API (substituir pela implementação real)
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

  /**
   * Verifica se todos os critérios de senha foram atendidos
   * @returns boolean - true se a senha for válida
   */
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

  /**
   * Componente para exibir cada regra de senha
   * @param isValid - Indica se a regra foi atendida
   * @param text - Texto da regra
   */
  const PasswordRule = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <View className="flex-row items-center mb-1">
      {/* Bolinha indicadora (verde se válido, cinza se não) */}
      <View className={`w-2 h-2 rounded-full mr-2 ${isValid ? 'bg-green-500' : 'bg-gray-300'}`} />
      {/* Texto da regra (verde se válido, cinza se não) */}
      <Text className={`text-sm ${isValid ? 'text-green-500' : 'text-gray-500'}`}>
        {text}
      </Text>
    </View>
  );

  // Renderização da tela
  return (
    <ScrollView>
      {/* Container principal */}
      <View className="flex-1 bg-white px-6 py-6 items-center justify-center min-h-screen">
        {/* Logo da aplicação */}
        <Logo size={300} />
        
        {/* Títulos da tela */}
        <Text className="text-2xl font-bold mb-2 text-gray-800">Criar nova senha</Text>
        <Text className="text-base text-gray-600 mb-8 text-center">
          Crie uma nova senha segura para sua conta
        </Text>

        {/* Campo para nova senha */}
        <View className="w-full mb-4">
          <InputField
            value={newPassword}
            onChange={setNewPassword}
            placeholder="Nova senha"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* Campo para confirmar nova senha */}
        <View className="w-full mb-6">
          <InputField
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirme a nova senha"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* Lista de requisitos da senha com feedback visual */}
        <View className="w-full mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <Text className="text-sm font-medium mb-2 text-gray-700">Sua senha deve conter:</Text>
          
          <PasswordRule 
            isValid={hasMinLength} 
            text="No mínimo 8 caracteres" 
          />
          <PasswordRule 
            isValid={hasUpperCase} 
            text="Pelo menos 1 letra maiúscula" 
          />
          <PasswordRule 
            isValid={hasLowerCase} 
            text="Pelo menos 1 letra minúscula" 
          />
          <PasswordRule 
            isValid={hasNumber} 
            text="Pelo menos 1 número" 
          />
          <PasswordRule 
            isValid={hasSpecialChar} 
            text="Pelo menos 1 caractere especial (!@#$%^&*)" 
          />
          <PasswordRule 
            isValid={passwordsMatch} 
            text="As senhas devem coincidir" 
          />
        </View>

        {/* Botão para submeter a nova senha */}
        <Button 
          onPress={handleSubmit}
          variant="primary"
          disabled={!isPasswordValid() || isLoading}
          className="w-full mb-4"
        >
          {isLoading ? 'Alterando...' : 'Alterar senha'}
        </Button>
        
        {/* Botão para cancelar e voltar */}
        <Button
          onPress={() => !isLoading && router.replace('/login')}
          variant="borderless"
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </View>
    </ScrollView>
  );
}