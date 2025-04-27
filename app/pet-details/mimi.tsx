import { View, Text, Image, Button } from "react-native";
import { useRouter } from 'expo-router';

export default function PetDetails() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1558788353-f76d92427f16" }}
        style={{ width: "100%", height: 300 }}
        resizeMode="cover"
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 8 }}>Rex</Text>
      <Text style={{ fontSize: 16, color: "gray" }}>Gato - 1 mês</Text>
      
      <Text style={{ marginTop: 16 }}>Tags:</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        <Text style={{ backgroundColor: "#e0e0e0", padding: 8, borderRadius: 12 }}>Curioso</Text>
        <Text style={{ backgroundColor: "#e0e0e0", padding: 8, borderRadius: 12 }}>Pequeno</Text>
      </View>

      <Text style={{ marginTop: 16 }}>Local de Retirada: São Paulo - SP</Text>
      <Button title="Solicitar Adoção" onPress={() => alert("Um e-mail foi enviado para confirmação, Obrigado!")} />
    </View>
  );
}
