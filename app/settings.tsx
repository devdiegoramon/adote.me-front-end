import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-row items-center justify-between px-4 py-5 bg-white shadow-md">
        <Text className="text-2xl font-bold text-gray-800">Configurações</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close-outline" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView className="p-4">
        <View className="mb-8">
          <Text className="text-xl font-semibold text-gray-700 mb-3">Geral</Text>
          <View className="flex-row items-center justify-between p-4 bg-white rounded-xl shadow-sm">
            <Text className="text-gray-600 text-base">Ativar notificações</Text>
            <Switch
              value={notificacoesAtivas}
              onValueChange={() => setNotificacoesAtivas(!notificacoesAtivas)}
            />
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-xl font-semibold text-gray-700 mb-3">Conta</Text>
          <TouchableOpacity className="flex-row items-center justify-between p-4 mb-4 bg-white rounded-xl shadow-sm">
            <Text className="text-gray-600 text-base">Alterar e-mail</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/forgotpassword')}
            className="flex-row items-center justify-between p-4 bg-white rounded-xl shadow-sm"
          >
            <Text className="text-gray-600 text-base">Esqueci minha senha</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View className="mb-8">
          <Text className="text-xl font-semibold text-gray-700 mb-3">Privacidade</Text>
          <TouchableOpacity className="flex-row items-center justify-between p-4 bg-white rounded-xl shadow-sm">
            <Text className="text-gray-600 text-base">Gerenciar permissões</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/')}
          className="mt-10 p-4 bg-red-600 rounded-xl shadow-md"
        >
          <Text className="text-center text-white text-lg font-semibold">Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
