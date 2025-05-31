// components/Button.tsx
import { TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";
import { ReactNode } from "react";

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
      className={`w-full ${bgColor} rounded-xl p-4`}
    >
      <Text className={`${textColor} text-center text-lg font-bold`}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  // Se tiver href, usamos Link
  if (href) {
    return (
      <Link href={href} asChild>
        {buttonContent}
      </Link>
    );
  }

  // Senão, só renderiza como botão com função
  return buttonContent;
}
