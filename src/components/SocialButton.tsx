import { Image, Text, TouchableOpacity } from "react-native";

export function SocialButton() {
  return (
    <TouchableOpacity className="w-full border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-4 flex-row items-center justify-center gap-4 mb-4">
      <Image
        source={require("../../assets/govbr-logo.png")}
        className="w-16 h-6"
        resizeMode="contain"
      />
      <Text className="text-black font-bold">Entrar com gov.br</Text>
    </TouchableOpacity>
  );
}
