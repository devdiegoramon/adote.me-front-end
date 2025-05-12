import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { Container } from '~/components/shared/Container';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página não encontrada' }} />
      <Container>
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-3xl font-extrabold text-blue-600 mb-4 text-center">
            Ops! Página não encontrada 😢
          </Text>

          <Text className="text-base text-zinc-600 mb-6 text-center">
            A rota que você tentou acessar não existe ou foi removida.
          </Text>

          <Link href="/home" asChild>
            <Text className="text-white bg-emerald-600 px-6 py-3 rounded-full font-semibold">
              Voltar para a Home
            </Text>
          </Link>
        </View>
      </Container>
    </>
  );
}
