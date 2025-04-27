import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router'; 

export default function Home() {
  const router = useRouter(); 

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      {/* Categorias */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        {["Pequenos", "Cães", "Gatos", "Grandes", "Macho", "Fêmea"].map((categoria, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: "#e0f7ef",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              marginRight: 8,
            }}
          >
            <Text style={{ color: "#2ecc71", fontWeight: "bold" }}>{categoria}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Cards dos pets */}
      <View style={{ gap: 16 }}>
        {/* Card 1 - Rex */}
        <TouchableOpacity onPress={() => router.push('/pet-details/rex')}>
          <PetCard
            nome="Rex"
            imagem="https://images.unsplash.com/photo-1558788353-f76d92427f16"
            tags={["Cão", "2 anos", "Dócil", "Pequeno", "Bom com Crianças"]}
          />
        </TouchableOpacity>

        {/* Card 2 - Mimi */}
        <TouchableOpacity onPress={() => router.push('/pet-details/mimi')}>
          <PetCard
            nome="Mimi"
            imagem="https://images.unsplash.com/photo-1592194996308-7b43878e84a6"
            tags={["Gato", "1 mês", "Curioso", "Pequeno"]}
          />
        </TouchableOpacity>

        {/* Card 3 - Thor */}
        <TouchableOpacity onPress={() => router.push('/pet-details/thor')}>
          <PetCard
            nome="Thor"
            imagem="https://images.unsplash.com/photo-1558788353-f76d92427f16"
            tags={["Cão", "3 anos", "Brincalhão", "Médio"]}
          />
        </TouchableOpacity>

        {/* Card 4 - Luna */}
        <TouchableOpacity onPress={() => router.push('/pet-details/luna')}>
          <PetCard
            nome="Luna"
            imagem="https://images.unsplash.com/photo-1592194996308-7b43878e84a6"
            tags={["Gata", "2 meses", "Carinhoso", "Pequeno"]}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function PetCard({ nome, imagem, tags }: { nome: string; imagem: string; tags: string[] }) {
  return (
    <View style={{ backgroundColor: "#f8f8f8", borderRadius: 12, overflow: "hidden", borderWidth: 1, borderColor: "#e0e0e0", elevation: 3 }}>
      <Image
        source={{ uri: imagem }}
        style={{ width: "100%", height: 200 }}
        resizeMode="cover"
      />
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>{nome}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {tags.map((tag, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#e0e0e0",
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 12,
                marginRight: 4,
                marginBottom: 4,
              }}
            >
              <Text style={{ fontSize: 12 }}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
