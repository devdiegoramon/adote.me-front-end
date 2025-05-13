import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput, Image, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

export default function PetRegistration() {
  const router = useRouter();
  
  // Estados do formulário
  const [petData, setPetData] = useState({
    name: '',
    species: 'dog',
    breed: '',
    age: '',
    gender: 'male',
    size: 'medium',
    color: '',
    description: '',
    vaccinated: false,
    dewormed: false,
    castrated: false,
    specialNeeds: '',
    temperament: 'friendly',
    photos: [] as string[],
  });

  const [isLoading, setIsLoading] = useState(false);

  // Manipulador genérico para campos de texto
  const handleChange = (field: string, value: string | boolean) => {
    setPetData(prev => ({ ...prev, [field]: value }));
  };

  // Adicionar foto
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para adicionar fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets) {
      handleChange('photos', [...petData.photos, result.assets[0].uri]);
    }
  };

  // Remover foto
  const removePhoto = (index: number) => {
    const newPhotos = [...petData.photos];
    newPhotos.splice(index, 1);
    handleChange('photos', newPhotos);
  };

  // Enviar formulário
  const handleSubmit = () => {
    // Validação básica
    if (!petData.name || !petData.breed || !petData.age || !petData.description || petData.photos.length === 0) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos obrigatórios e adicione pelo menos uma foto.');
      return;
    }

    setIsLoading(true);
    
    // Simulação de envio para API
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Sucesso!', 'Pet cadastrado com sucesso!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }, 1500);
  };

  return (
    <ScrollView className="bg-white">
      <View className="flex-1 px-6 py-6 min-h-screen">
        {/* Cabeçalho */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#059669" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800 ml-4">Cadastrar Pet</Text>
        </View>

        {/* Formulário */}
        <View className="mb-8">
            {/* Seção de Fotos */}
            <View className="mb-8 w-full">
            <View className="mb-3">
                <Text className="text-lg font-semibold text-gray-800">Fotos do Pet*</Text>
                <Text className="text-sm text-gray-500">Adicione pelo menos uma foto de boa qualidade</Text>
            </View>

            {petData.photos.length < 5 && (
                <TouchableOpacity
                className="w-full h-48 border-2 border-dashed border-emerald-500 rounded-lg items-center justify-center mb-3"
                onPress={pickImage}
                >
                <Feather name="plus" size={28} color="#059669" />
                <Text className="text-emerald-500 mt-2">Clique para adicionar fotos</Text>
                </TouchableOpacity>
            )}

            {petData.photos.length > 0 && (
                <>
                <Text className="text-sm text-gray-500 mb-2">Fotos adicionadas:</Text>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    className="w-full mb-2"
                >
                    <View className="flex-row">
                    {petData.photos.map((photo, index) => (
                        <View key={index} className="relative mr-3">
                        <Image 
                            source={{ uri: photo }} 
                            className="w-24 h-24 rounded-lg"
                        />
                        <TouchableOpacity 
                            className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
                            onPress={() => removePhoto(index)}
                        >
                            <Feather name="x" size={14} color="white" />
                        </TouchableOpacity>
                        </View>
                    ))}
                    </View>
                </ScrollView>
                </>
            )}

            {petData.photos.length >= 5 && (
                <Text className="text-sm text-gray-500">Limite máximo de 5 fotos atingido</Text>
            )}
            </View>

          {/* Informações básicas */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Informações Básicas</Text>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-1">Nome*</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-base"
                placeholder="Ex: Rex"
                value={petData.name}
                onChangeText={(text) => handleChange('name', text)}
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-1">Espécie*</Text>
              <View className="flex-row border border-gray-200 rounded-xl overflow-hidden">
                <TouchableOpacity
                  className={`flex-1 py-3 items-center ${petData.species === 'dog' ? 'bg-emerald-500' : 'bg-gray-50'}`}
                  onPress={() => handleChange('species', 'dog')}
                >
                  <Text className={`font-medium ${petData.species === 'dog' ? 'text-white' : 'text-gray-700'}`}>Cachorro</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex-1 py-3 items-center ${petData.species === 'cat' ? 'bg-emerald-500' : 'bg-gray-50'}`}
                  onPress={() => handleChange('species', 'cat')}
                >
                  <Text className={`font-medium ${petData.species === 'cat' ? 'text-white' : 'text-gray-700'}`}>Gato</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-1">Raça*</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-base"
                placeholder="Ex: Vira-lata, Labrador"
                value={petData.breed}
                onChangeText={(text) => handleChange('breed', text)}
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-1">Idade*</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-base"
                placeholder="Ex: 2 anos ou 6 meses"
                value={petData.age}
                onChangeText={(text) => handleChange('age', text)}
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-1">Sexo*</Text>
              <View className="flex-row border border-gray-200 rounded-xl overflow-hidden">
                <TouchableOpacity
                  className={`flex-1 py-3 items-center ${petData.gender === 'male' ? 'bg-emerald-500' : 'bg-gray-50'}`}
                  onPress={() => handleChange('gender', 'male')}
                >
                  <Text className={`font-medium ${petData.gender === 'male' ? 'text-white' : 'text-gray-700'}`}>Macho</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex-1 py-3 items-center ${petData.gender === 'female' ? 'bg-emerald-500' : 'bg-gray-50'}`}
                  onPress={() => handleChange('gender', 'female')}
                >
                  <Text className={`font-medium ${petData.gender === 'female' ? 'text-white' : 'text-gray-700'}`}>Fêmea</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-1">Porte*</Text>
              <View className="flex-row border border-gray-200 rounded-xl overflow-hidden">
                {['small', 'medium', 'large'].map(size => (
                  <TouchableOpacity
                    key={size}
                    className={`flex-1 py-3 items-center ${petData.size === size ? 'bg-emerald-500' : 'bg-gray-50'}`}
                    onPress={() => handleChange('size', size)}
                  >
                    <Text className={`font-medium ${petData.size === size ? 'text-white' : 'text-gray-700'}`}>
                      {size === 'small' ? 'Pequeno' : size === 'medium' ? 'Médio' : 'Grande'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-1">Cor*</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-base"
                placeholder="Ex: Preto e branco"
                value={petData.color}
                onChangeText={(text) => handleChange('color', text)}
              />
            </View>
          </View>

          {/* Saúde */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Saúde</Text>
            
            <View className="flex-row items-center justify-between mb-3 py-2">
              <Text className="text-sm font-medium text-gray-700">Vacinado</Text>
              <Switch
                value={petData.vaccinated}
                onValueChange={(value) => handleChange('vaccinated', value)}
                trackColor={{ false: '#e5e7eb', true: '#059669' }}
              />
            </View>
            
            <View className="flex-row items-center justify-between mb-3 py-2">
              <Text className="text-sm font-medium text-gray-700">Vermifugado</Text>
              <Switch
                value={petData.dewormed}
                onValueChange={(value) => handleChange('dewormed', value)}
                trackColor={{ false: '#e5e7eb', true: '#059669' }}
              />
            </View>
            
            <View className="flex-row items-center justify-between mb-3 py-2">
              <Text className="text-sm font-medium text-gray-700">Castrado</Text>
              <Switch
                value={petData.castrated}
                onValueChange={(value) => handleChange('castrated', value)}
                trackColor={{ false: '#e5e7eb', true: '#059669' }}
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-1">Necessidades especiais</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-base"
                placeholder="Ex: Precisa de medicação contínua"
                value={petData.specialNeeds}
                onChangeText={(text) => handleChange('specialNeeds', text)}
                multiline
              />
            </View>
          </View>

          {/* Temperamento */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Temperamento</Text>
            
            <View className="flex-row flex-wrap mb-4">
              {[
                { value: 'friendly', label: 'Amigável' },
                { value: 'shy', label: 'Tímido' },
                { value: 'calm', label: 'Calmo' },
                { value: 'energetic', label: 'Energético' },
                { value: 'independent', label: 'Independente' },
                { value: 'affectionate', label: 'Carinhoso' },
              ].map(item => (
                <TouchableOpacity
                  key={item.value}
                  className={`py-2 px-4 mr-2 mb-2 rounded-full ${petData.temperament === item.value ? 'bg-emerald-500' : 'bg-gray-100'}`}
                  onPress={() => handleChange('temperament', item.value)}
                >
                  <Text className={`text-sm ${petData.temperament === item.value ? 'text-white' : 'text-gray-700'}`}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Descrição */}
          <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Descrição*</Text>
          <TextInput
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-base h-32 text-align-top"
              placeholder="Conte um pouco sobre o pet, seu histórico, personalidade, etc."
              placeholderTextColor="#999"
              value={petData.description}
              onChangeText={(text) => handleChange('description', text)}
              multiline
              textAlignVertical="top"
          />
          </View>

          {/* Botão de envio */}
          <TouchableOpacity
            className="bg-emerald-500 py-4 rounded-xl items-center justify-center w-full mb-6"
            activeOpacity={0.7}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text className="text-white font-bold text-base">Cadastrando...</Text>
            ) : (
              <Text className="text-white font-bold text-base">Cadastrar Pet</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}