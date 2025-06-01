import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View, Dimensions } from "react-native";
import { Button } from "../../components/Button";

const { width, height } = Dimensions.get('window');

export default function Search() {
  return (
    <SafeAreaView className="flex-1 bg-green">
      <View className="flex-1 justify-between items-center px-6 py-4">
        
        {/* Container da Imagem */}
        <View className="flex-1 justify-center items-center" style={{ minHeight: height * 0.3 }}>
          <Image
            className="max-h-64"
            style={{
              width: Math.min(width * 0.6, 250),
              height: Math.min(height * 0.25, 200),
            }}
            resizeMode="contain"
            source={require("../../../assets/paw.png")}
          />
        </View>

        {/* Container do Texto e Botão */}
        <View className="w-full" style={{ minHeight: height * 0.4 }}>
          <Text 
            className="text-white font-bold text-center mb-8"
            style={{
              fontSize: Math.min(width * 0.08, 32),
              lineHeight: Math.min(width * 0.1, 40),
              paddingHorizontal: width * 0.05,
            }}
          >
            Queremos saber quais pets mais tocam o seu coração!
          </Text>
          
          <View style={{ paddingBottom: height * 0.05 }}>
            <Button text="Começar" href="/recomendation" variant="secondary" />
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  );
}