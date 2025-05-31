import { TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";

interface ButtonProps {
  text: string;
  href?: string; // agora é opcional
  onPress?: () => void;
  variant?: "primary" | "secondary";
}

export function Button({
  text,
  href,
  onPress,
  variant = "primary",
}: ButtonProps) {
  const bgColor =
    variant === "primary" ? "bg-green" : "bg-white border-2 border-green";
  const textColor = variant === "primary" ? "text-white" : "text-green";

  const buttonContent = (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full ${bgColor} rounded-xl p-4 mb-4`}
    >
      <Text className={`${textColor} text-center text-lg font-bold`}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
}
