import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../styles/colors";

interface DropdownProps {
  title: string;
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export function Dropdown({
  title,
  options,
  selectedValue,
  onValueChange,
}: DropdownProps) {
  return (
    <View className="w-full mb-4">
      <Text className="text-base font-medium text-black mb-2">{title}</Text>
      <View className="border-2 border-gray-200 bg-gray-50 rounded-xl">
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          dropdownIconColor={colors.gray[500]}
        >
          {options.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
