import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-row items-center justify-between p-4 bg-white shadow-md">
        <Text className="text-xl font-semibold text-gray-700">Settings</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView className="p-4">
        <View className="mb-6">
          <Text className="text-lg font-medium text-gray-700">General</Text>
          <View className="flex-row items-center justify-between mt-4">
            <Text className="text-gray-600">Dark Mode</Text>
            <Switch />
          </View>
          <View className="flex-row items-center justify-between mt-4">
            <Text className="text-gray-600">Notifications</Text>
            <Switch />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-medium text-gray-700">Account</Text>
          <TouchableOpacity className="flex-row items-center justify-between mt-4 p-3 bg-white rounded-lg shadow-md">
            <Text className="text-gray-600">Change Email</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between mt-4 p-3 bg-white rounded-lg shadow-md">
            <Text className="text-gray-600">Change Password</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-medium text-gray-700">Privacy</Text>
          <TouchableOpacity className="flex-row items-center justify-between mt-4 p-3 bg-white rounded-lg shadow-md">
            <Text className="text-gray-600">Manage Permissions</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="mt-8 p-4 bg-red-600 rounded-lg shadow-md">
          <Text className="text-center text-white text-lg font-medium">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
