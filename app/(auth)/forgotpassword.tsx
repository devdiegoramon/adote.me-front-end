import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Logo } from '~/components/base/Logo';
import { Button } from '~/components/base/Button';
import { InputField } from '~/components/base/InputField';
import { SocialButton } from '~/components/base/SocialButton';

// Componente principal para a tela de recuperação de senha
export default function ForgotPassword() {
  const router = useRouter();
  // Estado para armazenar o email digitado pelo usuário
  const [email, setEmail] = useState('');
  // Estado para controlar o loading durante o processamento
  const [isLoading, setIsLoading] = useState(false);
  // Estado para o contador regressivo (em segundos)
  const [countdown, setCountdown] = useState(0);

  // Efeito para gerenciar o contador regressivo
  useEffect(() => {
    if (countdown > 0) {
      // Configura um timer para decrementar o contador a cada segundo
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      // Limpa o timer quando o componente é desmontado ou o countdown muda
      return () => clearTimeout(timer);
    }
  }, [countdown]); // Executa sempre que o countdown é alterado

  // Função para lidar com o processo de recuperação de senha
  const handleRecovery = async () => {
    // Validação: verifica se o email foi informado
    if (!email) {
      Alert.alert('Erro', 'Por favor, informe seu email cadastrado.');
      return;
    }

    // Validação: verifica se o email tem formato válido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    // Inicia o estado de loading
    setIsLoading(true);
    
    try {
      // Simula uma chamada à API (substituir pela implementação real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Exibe mensagem de sucesso
      Alert.alert(
        'Email enviado',
        'Enviamos um link de recuperação para seu email. Por favor, verifique sua caixa de entrada.',
        [{ text: 'OK', onPress: () => router.back() }] // Volta para tela anterior ao pressionar OK
      );
      
      // Inicia o contador de 60 segundos para evitar novos envios
      setCountdown(60);
    } catch (error) {
      // Tratamento de erro genérico
      Alert.alert('Erro', 'Ocorreu um problema ao enviar o email. Tente novamente.');
    } finally {
      // Finaliza o estado de loading independente de sucesso ou erro
      setIsLoading(false);
    }
  };

  // Renderização do componente
  return (
    <ScrollView>
      {/* Container principal */}
      <View className="flex-1 bg-white px-6 py-6 items-center justify-center min-h-screen">
        {/* Logo da aplicação */}
        <Logo size={300} />
        
        {/* Título e descrição */}
        <Text className="text-2xl font-bold mb-2 text-gray-800">Recuperar senha</Text>
        <Text className="text-base text-gray-600 mb-8 text-center">
          Informe o email associado à sua conta para receber as instruções
        </Text>

        {/* Área do formulário */}
        <View className="w-full mb-6">
          {/* Campo de entrada para o email */}
          <InputField
            value={email}
            onChange={setEmail}
            placeholder="Email"
            keyboardType="email-address" // Teclado otimizado para emails
            autoCapitalize="none" // Evita capitalização automática
          />

          {/* Botão principal - Enviar link de recuperação */}
          <Button 
            onPress={handleRecovery}
            variant="primary"
            disabled={isLoading || countdown > 0} // Desabilita durante loading ou countdown
          >
            {isLoading ? (
              'Enviando...' // Texto durante loading
            ) : countdown > 0 ? (
              `Aguarde ${countdown}s` // Mostra contador regressivo
            ) : (
              'Enviar link' // Texto padrão
            )}
          </Button>
          
          {/* Botão secundário - Voltar para login */}
          <Button
            onPress={() => router.back()}
            variant="borderless" // Estilo sem fundo
            disabled={isLoading} // Desabilita durante loading
            className="mt-4" // Margem superior
          >
            Voltar para login
          </Button>
        </View>

        {/* Divisor visual com texto "ou" no centro */}
        <View className="flex-row items-center mb-6 w-full">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-2 text-gray-500">ou</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* Botão de login social (gov.br) */}
        <SocialButton 
          onPress={() => !isLoading && router.replace('/(tabs)/home')}
          disabled={isLoading} // Desabilita durante loading
        />
      </View>
    </ScrollView>
  );
}