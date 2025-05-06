import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Logo } from '~/components/base/Logo';

export default function Sucesso() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-blue-400 px-6">
      
      <Logo />

      <Text className="text-white text-center text-2xl font-bold mt-6">
        Você está a um passo de transformar uma vida!
      </Text>

      <Pressable
        onPress={() => router.replace('/home')}
        className="bg-white rounded-xl px-6 py-4 mt-10"
      >
        <Text className="text-blue-600 font-semibold text-base">
          Retornar
        </Text>
      </Pressable>
    </View>
  );
}
