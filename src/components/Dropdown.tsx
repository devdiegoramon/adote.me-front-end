import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface DropdownProps {
  title: string;
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export function Dropdown({ title, options, selectedValue, onValueChange }: DropdownProps) {
  return (
    <View>
      <Text className="text-black font-medium mb-1">{title}</Text>
      <View className="border border-black/5 bg-black/5 rounded-xl">
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          {options.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
