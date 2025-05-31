import { View, Text } from 'react-native';

interface InfoCardProps {
  label: string;
  value: string;
  labelStyle?: string;
  valueStyle?: string;
  containerStyle?: string;
}

export function InfoCard({
  label,
  value,
  labelStyle = 'text-xs text-gray-500',
  valueStyle = 'text-base text-black font-medium',
  containerStyle = 'bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2'
}: InfoCardProps) {
  return (
    <View className={containerStyle}>
      <Text className={labelStyle}>{label}</Text>
      <Text className={valueStyle}>{value}</Text>
    </View>
  );
}