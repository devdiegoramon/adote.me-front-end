import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';

import { Text } from '~/components/nativewindui/Text';
import { useColorScheme } from '~/lib/useColorScheme';

export default function ModalScreen() {
  const { colors, colorScheme } = useColorScheme();
  return (
    <>
      <StatusBar
        style={Platform.OS === 'ios' ? 'light' : colorScheme === 'dark' ? 'light' : 'dark'}
      />
      <View className="flex-1 items-center justify-center gap-1 px-12">
        <Text variant="title3" className="pb-1 text-center font-semibold">
          Adote.me
        </Text>
      </View>
    </>
  );
}
