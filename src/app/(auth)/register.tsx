import { ScrollView, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link, router } from "expo-router";
import { FormInput } from "../../components/FormInput"; // Ajuste o caminho conforme necessário
import { Button } from "../../components/Button";
import { Divisor } from "../../components/Divisor";
import { SocialButton } from "../../components/SocialButton";
import { FormSwitch } from "../../components/FormSwitch"; // Adicionando o FormSwitch

export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpfOuCnpj, setCpfOuCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isOng, setIsOng] = useState(false);

  const handleRegister = () => {
    if (
      !nome ||
      !email ||
      !cpfOuCnpj ||
      !telefone ||
      !endereco ||
      !senha ||
      !confirmarSenha
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    router.replace("/home");
  };

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
            value={isOng}
            onValueChange={(newValue) => setIsOng(newValue)}
          />

          <View className="w-full">
            <FormInput
              label={isOng ? "Nome da ONG" : "Nome completo"}
              value={nome}
              onChangeText={setNome}
              placeholder={
                isOng ? "Digite o nome da ONG" : "Digite seu nome completo"
              }
            />

            <FormInput
              label={isOng ? "E-mail da instituição" : "E-mail"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder={
                isOng ? "Digite o e-mail da instituição" : "Digite seu e-mail"
              }
            />

            <FormInput
              label={isOng ? "CNPJ" : "CPF"}
              value={cpfOuCnpj}
              onChangeText={setCpfOuCnpj}
              keyboardType="numeric"
              placeholder={isOng ? "Digite o CNPJ" : "Digite o CPF"}
            />

            <FormInput
              label="Telefone"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
              placeholder="Digite seu telefone"
            />

            <FormInput
              label="Endereço"
              value={endereco}
              onChangeText={setEndereco}
              placeholder="Digite seu endereço"
            />

            <FormInput
              label="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              placeholder="Crie uma senha"
            />

            <FormInput
              label="Confirmar senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
              placeholder="Confirme sua senha"
            />
          </View>

          <Button text="Cadastrar" onPress={handleRegister} />

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
