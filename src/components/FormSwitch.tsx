import { View, Text, Switch } from "react-native";

type FormSwitchProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function FormSwitch({ label, value, onValueChange }: FormSwitchProps) {
  return (
    <View className="flex-row items-center justify-between w-full mb-4">
      <Text className="text-black font-bold text-base">{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor="#ffffff"
        trackColor={{ true: "#22c55e" }}
      />
    </View>
  );
}
