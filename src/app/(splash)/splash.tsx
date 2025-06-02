import { useCallback, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [isUserOng, setIsUserOng] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem("token");
        const role = await AsyncStorage.getItem("user_role");
        setHasUser(!!token);
        setIsUserOng(role === "ONG");
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (appIsReady) {
    if (hasUser) {
      if (isUserOng) {
        return (<Redirect href="(ong)/home" />);
      }
      return (<Redirect href="(adotante)/home" />);
    }
    return <Redirect href="(auth)/login" />;
  }

  return (
    <SafeAreaView className="flex-1 p-6">
      <View className="w-full h-full items-center" onLayout={onLayoutRootView}>
        <Image
          source={require("../../../assets/logo.png")}
          className="w-64 m-auto"
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}
