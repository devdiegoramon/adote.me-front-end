import { ScrollView, View, Text, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { Link, useRouter } from "expo-router";
import { FormInput } from "../../components/FormInput";
import { Button } from "../../components/Button";
import { Divisor } from "../../components/Divisor";
import { SocialButton } from "../../components/SocialButton";
import { FormSwitch } from "../../components/FormSwitch";
import { signup } from "../../../lib/api/signup";
import type { SignupPayload } from "../../../lib/api/signup";

type UserType = "adotante" | "ong";

export default function RegisterScreen() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>("adotante");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    // Campos para endereço desmembrados para ONGs:
    logradouro: "",
    bairro: "",
    complemento: "",
    cpf: "",
    cnpj: "",
  });

  const handleInputChange = useCallback(
    (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const validateForm = () => {
    const {
      nome,
      email,
      telefone,
      senha,
      confirmarSenha,
      logradouro,
      bairro,
      complemento,
      cpf,
      cnpj,
    } = formData;

    if (
      !nome ||
      !email ||
      !telefone ||
      !senha ||
      !confirmarSenha ||
      (userType === "ong" && (!logradouro || !bairro)) // pelo menos logradouro e bairro
    ) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return false;
    }

    if (userType === "adotante" && !cpf) {
      Alert.alert("Erro", "Informe o seu CPF.");
      return false;
    }

    if (userType === "ong" && !cnpj) {
      Alert.alert("Erro", "Informe o CNPJ da ONG.");
      return false;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return false;
    }

    return true;
  };

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    try {
      const enderecoObj =
        userType === "ong"
          ? {
              logradouro: formData.logradouro,
              bairro: formData.bairro,
              complemento: formData.complemento,
            }
          : undefined;

      const coordenadasObj =
        userType === "ong"
          ? {
              latitude: -23.5505,
              longitude: -46.6333,
            }
          : undefined;

      const payload: SignupPayload =
        userType === "ong"
          ? {
              nome: formData.nome,
              email: formData.email,
              telefone: formData.telefone,
              senha: formData.senha,
              tipo: "ONG",
              telefone_contato: formData.telefone,
              whatsapp: "11999999999",
              cidade: "Cidade Exemplo",
              estado: "SP",
              cep: "12345-678",
              endereco: enderecoObj!,
              coordenadas: coordenadasObj!,
              cnpj: formData.cnpj,
              imagem_url: "https://example.com/imagem.jpg",
              redes_sociais: {
                instagram: "https://instagram.com/exemplo",
                facebook: "https://facebook.com/exemplo",
              },
            }
          : {
              nome: formData.nome,
              email: formData.email,
              telefone: formData.telefone,
              senha: formData.senha,
              tipo: "adotante",
              preferencias: ["Gato", "Pequeno porte"],
              cpf: formData.cpf,
            };

      console.log("Payload final:", payload);
      await signup(payload);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      router.replace(userType === "ong" ? "/(ong)/home" : "/(adotante)/home");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao realizar cadastro.");
    }
  }, [formData, userType, router]);

  return (
    <SafeAreaView className="flex-1 bg-white px-6 py-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center">
          <Image
            source={require("../../../assets/logo.png")}
            className="w-64"
            resizeMode="contain"
          />

          <View className="items-center mb-4">
            <Text className="text-3xl font-bold text-black">
              Crie sua conta
            </Text>
            <Text className="text-xl text-gray-500">
              Preencha os dados abaixo
            </Text>
          </View>

          <FormSwitch
            label="Sou ONG"
            value={userType === "ong"}
            onValueChange={(newValue) =>
              setUserType(newValue ? "ong" : "adotante")
            }
          />

          <View className="w-full">
            <FormInput
              label={userType === "ong" ? "Nome da ONG" : "Nome completo"}
              value={formData.nome}
              onChangeText={(text) => handleInputChange("nome", text)}
              placeholder={
                userType === "ong"
                  ? "Digite o nome da ONG"
                  : "Digite seu nome completo"
              }
            />

            <FormInput
              label={userType === "ong" ? "E-mail da instituição" : "E-mail"}
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder={
                userType === "ong"
                  ? "Digite o e-mail da instituição"
                  : "Digite seu e-mail"
              }
            />

            <FormInput
              label={userType === "ong" ? "CNPJ" : "CPF"}
              value={userType === "ong" ? formData.cnpj : formData.cpf}
              onChangeText={(text) =>
                handleInputChange(userType === "ong" ? "cnpj" : "cpf", text)
              }
              keyboardType="numeric"
              placeholder={
                userType === "ong" ? "Digite o CNPJ" : "Digite o CPF"
              }
            />

            <FormInput
              label="Telefone"
              value={formData.telefone}
              onChangeText={(text) => handleInputChange("telefone", text)}
              keyboardType="phone-pad"
              placeholder="Digite seu telefone"
            />

            {/* Campos de endereço somente para ONG */}
            {userType === "ong" && (
              <>
                <FormInput
                  label="Logradouro"
                  value={formData.logradouro}
                  onChangeText={(text) => handleInputChange("logradouro", text)}
                  placeholder="Rua, Avenida, etc."
                />
                <FormInput
                  label="Bairro"
                  value={formData.bairro}
                  onChangeText={(text) => handleInputChange("bairro", text)}
                  placeholder="Digite o bairro"
                />
                <FormInput
                  label="Complemento"
                  value={formData.complemento}
                  onChangeText={(text) =>
                    handleInputChange("complemento", text)
                  }
                  placeholder="Sala, apto, etc."
                />
              </>
            )}

            {/* Para adotante, campo endereço é opcional? Caso queira, adicione abaixo */}

            <FormInput
              label="Senha"
              value={formData.senha}
              onChangeText={(text) => handleInputChange("senha", text)}
              secureTextEntry
              placeholder="Crie uma senha"
            />

            <FormInput
              label="Confirmar senha"
              value={formData.confirmarSenha}
              onChangeText={(text) => handleInputChange("confirmarSenha", text)}
              secureTextEntry
              placeholder="Confirme sua senha"
            />
          </View>

          <Button text="Cadastrar" onPress={handleSubmit} />

          <Divisor />

          <SocialButton />

          <View className="flex-row">
            <Text className="text-black">Já tem uma conta? </Text>
            <Link href="/login" className="text-green font-bold">
              Entrar
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
