import { View, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../styles/colors";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  iconName?: string;
  iconColor?: string;
  className?: string;
  inputClassName?: string;
}

export function SearchInput({
  value,
  onChangeText,
  placeholder,
  iconName = "search",
  iconColor = colors.black,
  className = "",
  inputClassName = "",
}: SearchInputProps) {
  return (
    <View
      className={`flex-row items-center bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2 gap-2 ${className}`}
    >
      <Ionicons name={iconName} size={20} color={iconColor} />
      <TextInput
        className={`w-full placeholder:text-gray-400 ${inputClassName}`}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="while-editing"
      />
    </View>
  );
}
