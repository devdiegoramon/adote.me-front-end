import { Image, StyleSheet, View } from 'react-native';

/**
 * Props do componente Logo
 * 
 * @property size - Tamanho da logo (largura em pixels)
 */
interface LogoProps {
  size?: number;
}

/**
 * Componente Logo
 * 
 * Exibe a logo da aplicação com:
 * - Tamanho ajustável
 * - Proporções mantidas
 * - Centralização vertical/horizontal
 */
export function Logo({ size = 150 }: LogoProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')} // Caminho da imagem
        style={{ width: size }} // Tamanho ajustável
        resizeMode="contain" // Mantém proporções
      />
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Centraliza horizontalmente
    justifyContent: 'center', // Centraliza verticalmente
    marginVertical: 20, // Espaçamento vertical
  },
});