import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black p-4">
      {/* Categorias */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
        {["Pequenos", "Cães", "Gatos", "Grandes", "Macho", "Fêmea"].map((categoria, index) => (
          <TouchableOpacity
            key={index}
            className="bg-emerald-100 dark:bg-emerald-900 py-2 px-4 rounded-full mr-2"
          >
            <Text className="text-emerald-500 dark:text-emerald-200 font-bold">{categoria}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Cards dos pets */}
      <View className="space-y-4">
        <TouchableOpacity onPress={() => router.push('/pet-details/rex')}>
          <PetCard
            nome="Rex"
            imagem="https://images.unsplash.com/photo-1558788353-f76d92427f16"
            tags={["Cão", "2 anos", "Dócil", "Pequeno", "Bom com Crianças"]}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/pet-details/mimi')}>
          <PetCard
            nome="Mimi"
            imagem="https://images.unsplash.com/photo-1592194996308-7b43878e84a6"
            tags={["Gato", "1 mês", "Curioso", "Pequeno"]}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/pet-details/thor')}>
          <PetCard
            nome="Thor"
            imagem="https://images.unsplash.com/photo-1558788353-f76d92427f16"
            tags={["Cão", "3 anos", "Brincalhão", "Médio"]}
          />
        </TouchableOpacity>

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
    <View className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600 shadow-sm">
      <Image
        source={{ uri: imagem }}
        className="w-full h-52"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-lg font-bold text-black dark:text-white mb-2">{nome}</Text>
        <View className="flex-row flex-wrap">
          {tags.map((tag, index) => (
            <View
              key={index}
              className="bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded-full mr-1 mb-1"
            >
              <Text className="text-xs text-black dark:text-white">{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
