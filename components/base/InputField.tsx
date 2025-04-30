import { View, TextInput, Text, TextInputProps } from 'react-native';

/**
 * Props do componente InputField
 * 
 * @property value - Valor do campo
 * @property onChange - Função chamada quando o texto muda
 * @property placeholder - Texto de placeholder
 * @property keyboardType - Tipo de teclado (email, numérico, etc)
 * @property secureTextEntry - Se esconde o texto (para senhas)
 * @property autoCapitalize - Capitalização automática
 * @property error - Mensagem de erro para validação
 */
type InputFieldProps = {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  error?: string;
};

/**
 * Componente InputField personalizado
 * 
 * Campo de entrada de texto reutilizável com:
 * - Suporte a erros de validação
 * - Diferentes tipos de teclado
 * - Opção para campos de senha
 * - Estilização condicional para erros
 */
export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'sentences',
  error,
}) => {
  // Estilo condicional baseado em erro
  const inputStyle = `
    bg-gray-50 border rounded-xl p-4 mb-1 text-base
    ${error ? 'border-red-500' : 'border-gray-200'}
  `;

  return (
    <View className="mb-4">
      <TextInput
        className={inputStyle}
        placeholder={placeholder}
        placeholderTextColor="#999" // Cor do placeholder
        value={value}
        onChangeText={onChange} // Atualiza o valor
        keyboardType={keyboardType} // Tipo de teclado
        secureTextEntry={secureTextEntry} // Para senhas
        autoCapitalize={autoCapitalize} // Capitalização
      />
      {/* Exibe mensagem de erro se existir */}
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};