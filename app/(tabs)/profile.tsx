import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PerfilUsuario() {
  const router = useRouter();

  const [perfil, setPerfil] = useState({
    nome: 'Fernando Sousa',
    email: 'fernandoss@email.com',
    telefone: '(11) 91234-5678',
    cep: '01234-567',
    rua: 'Rua dos Desenvolvedores, 123',
    cidade: 'São Paulo - SP',
  });

  const [modalVisivel, setModalVisivel] = useState(false);
  const [campoAtual, setCampoAtual] = useState('');
  const [valorTemp, setValorTemp] = useState('');

  const abrirModal = (campo: string) => {
    setCampoAtual(campo);
    setValorTemp(perfil[campo as keyof typeof perfil]);
    setModalVisivel(true);
  };

  const confirmarEdicao = () => {
    setPerfil({ ...perfil, [campoAtual]: valorTemp });
    setModalVisivel(false);
  };

  const dadosPessoais = [
    { label: 'Nome completo', key: 'nome' },
    { label: 'E-mail', key: 'email' },
    { label: 'Telefone', key: 'telefone' },
  ];

  const endereco = [
    { label: 'CEP', key: 'cep' },
    { label: 'Rua', key: 'rua' },
    { label: 'Cidade / Estado', key: 'cidade' },
  ];

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="p-4 space-y-6">
        {/* Dados Pessoais */}
        <View>
          <Text className="text-lg font-semibold text-gray-700 mb-2">Dados Pessoais</Text>
          <View className="space-y-3">
            {dadosPessoais.map((item) => (
              <TouchableOpacity
                key={item.key}
                className="flex-row items-center justify-between p-4 bg-white rounded-2xl shadow-sm"
                onPress={() => abrirModal(item.key)}
              >
                <View>
                  <Text className="text-sm text-gray-500">{item.label}</Text>
                  <Text className="text-base font-medium text-gray-800">{perfil[item.key as keyof typeof perfil]}</Text>
                </View>
                <Ionicons name="create-outline" size={22} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Endereço */}
        <View>
          <Text className="text-lg font-semibold text-gray-700 mb-2">Endereço</Text>
          <View className="space-y-3">
            {endereco.map((item) => (
              <TouchableOpacity
                key={item.key}
                className="flex-row items-center justify-between p-4 bg-white rounded-2xl shadow-sm"
                onPress={() => abrirModal(item.key)}
              >
                <View>
                  <Text className="text-sm text-gray-500">{item.label}</Text>
                  <Text className="text-base font-medium text-gray-800">{perfil[item.key as keyof typeof perfil]}</Text>
                </View>
                <Ionicons name="create-outline" size={22} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modal de edição */}
      <Modal visible={modalVisivel} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="w-11/12 bg-white p-6 rounded-2xl">
            <Text className="text-lg font-semibold text-gray-700 mb-3">Editar {campoAtual}</Text>
            <TextInput
              value={valorTemp}
              onChangeText={setValorTemp}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
              placeholder="Digite o novo valor"
              autoFocus
            />
            <View className="flex-row justify-end mt-4 space-x-2">
              <TouchableOpacity
                onPress={() => setModalVisivel(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                <Text className="text-gray-800">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmarEdicao}
                className="px-4 py-2 bg-blue-600 rounded-lg"
              >
                <Text className="text-white font-medium">Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
