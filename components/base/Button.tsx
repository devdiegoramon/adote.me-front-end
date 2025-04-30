import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { ReactNode } from 'react';

/**
 * Props do componente Button
 * 
 * @property variant - Estilo do botão ('primary' ou 'borderless')
 * @property size - Tamanho do botão ('sm', 'md' ou 'lg')
 * @property fullWidth - Se ocupa toda a largura disponível
 * @property isLoading - Mostra um indicador de carregamento
 * @property disabled - Desabilita o botão
 * @property children - Conteúdo do botão
 */
type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
  variant?: 'primary' | 'borderless';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
};

/**
 * Componente Button personalizado
 * 
 * Botão reutilizável com múltiplos estilos e estados
 * - Suporta loading e desabilitado
 * - Três tamanhos diferentes
 * - Dois estilos (primary e borderless)
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  className = '',
  disabled = false,
  isLoading = false,
  ...props
}: ButtonProps) {
  // Classes CSS condicionais baseadas nas props
  const variantClasses = {
    primary: disabled ? 'bg-emerald-400' : 'bg-emerald-500', // Verde mais claro quando desabilitado
    borderless: '', // Sem fundo para a variante borderless
  };

  const sizeClasses = {
    sm: 'py-2', // Pequeno
    md: 'py-3', // Médio (padrão)
    lg: 'py-4', // Grande
  };

  // Cor do texto baseada na variante
  const textColorClasses = {
    primary: 'text-white', // Texto branco para primary
    borderless: disabled ? 'text-emerald-400' : 'text-emerald-500', // Texto verde
  };

  return (
    <TouchableOpacity
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-xl items-center justify-center
        ${disabled && !isLoading ? 'opacity-80' : ''}
        ${className}
      `}
      activeOpacity={0.7} // Efeito de toque suave
      disabled={disabled || isLoading} // Desabilita se loading ou disabled
      {...props} // Passa todas as outras props do TouchableOpacity
    >
      {isLoading ? (
        // Mostra spinner quando em loading
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#10b981'} />
      ) : (
        // Mostra conteúdo normal quando não está loading
        <Text className={`${textColorClasses[variant]} font-bold text-base`}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}