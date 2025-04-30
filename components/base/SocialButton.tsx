import { TouchableOpacity, Text, View, Image } from 'react-native';

/**
 * Props do componente SocialButton
 * 
 * @property onPress - Função chamada ao pressionar
 * @property disabled - Se o botão está desabilitado
 */
type SocialButtonProps = {
  onPress: () => void;
  disabled?: boolean;
};

/**
 * Componente SocialButton
 * 
 * Botão para login social (gov.br) com:
 * - Ícone integrado
 * - Estado desabilitado
 * - Estilo específico para login social
 */
export function SocialButton({ onPress, disabled = false }: SocialButtonProps) {
  return (
    <TouchableOpacity
      className={`
        w-full
        py-3
        ${disabled ? 'bg-gray-300' : 'bg-gray-50'} // Fundo cinza claro
        rounded-xl
        items-center
        justify-center
        flex-row
        border ${disabled ? 'border-gray-300' : 'border-gray-200'} // Borda condicional
        ${disabled && 'opacity-70'} // Opacidade reduzida quando desabilitado
      `}
      activeOpacity={0.7} // Efeito de toque
      onPress={onPress}
      disabled={disabled}
    >
      {/* Ícone do gov.br */}
      <Image
        source={require("../../assets/logo-govbr.png")} // Imagem do ícone
        style={{ width: 64, height: 24 }} // Dimensões fixas
        resizeMode="contain" // Mantém proporções
        className="mr-3" // Margem à direita
      />
      {/* Texto do botão */}
      <Text className={`${disabled ? 'text-gray-500' : 'text-gray-800'} font-bold text-base`}>
        Entrar com gov.br
      </Text>
    </TouchableOpacity>
  );
}