import { View, Text, TextInput, TextInputProps } from "react-native";

type FormInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
} & TextInputProps;

export function FormInput({
  label,
  value,
  onChangeText,
  placeholder = "",
  multiline = false,
  ...rest
}: FormInputProps) {
  return (
    <View className="w-full mb-4">
      <Text className="text-base font-medium text-black mb-2">{label}</Text>
      <TextInput
        className="border-2 border-gray-200 bg-gray-50 rounded-xl p-4 placeholder:text-gray-400 w-full"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        textAlignVertical={multiline ? "top" : "center"} // para manter padding adequado em multiline
        {...rest}
      />
    </View>
  );
}
