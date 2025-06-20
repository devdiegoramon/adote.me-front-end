
# 🐾 Adote.me Front-End

Este é o repositório do front-end do projeto **Adote.me**, uma plataforma para promover a adoção responsável de animais. O aplicativo conecta adotantes com ONGs que cuidam de animais, oferecendo uma experiência intuitiva e acessível.

---

## 🚀 Tecnologias Usadas

- **React Native**
- **Expo**
- **Expo Router**
- **React Navigation**
- **NativeWind (Tailwind CSS para React Native)**
- **Tailwind CSS**

---

## ⚙️ Iniciando o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/devdiegoramon/adote.me-front-end.git
cd adote.me-front-end
```

### 2. Instalar as Dependências

```bash
npm install
```

### 3. Iniciar o Projeto

- **Executando localmente**:
  ```bash
  npx expo start
  ```

- **Executando via Codespaces (modo túnel)**:
  ```bash
  npx expo start --tunnel
  ```

### 4. Testando no Dispositivo Móvel

Para testar no celular, instale o aplicativo **Expo Go** e escaneie o QR code que aparece no terminal ou no navegador.

---

## 🌳 Estrutura de Branches

- `main`: Versão estável e pronta para produção.
- `develop`: Branch de desenvolvimento, onde novas funcionalidades são criadas.
- `seu_nome`: Cópia da `develop` com ajustes pessoais.
- `funcionalidade_seu_nome`: Branch específica para uma funcionalidade em desenvolvimento.

---

## 🤝 Contribuindo com o Projeto

1. Crie sua branch a partir de `develop`:

```bash
git checkout develop
git checkout -b minha-feature
```

2. Faça alterações e realize commits:

```bash
git add .
git commit -m "Descrição da funcionalidade"
```

3. Envie a branch para o repositório remoto:

```bash
git push origin minha-feature
```

4. Abra um Pull Request (PR) para a branch `main`.

### Configuração do Git

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@example.com"
```

---

## 🧱 Estrutura do Projeto

### `src/styles/`
Contém definições globais de estilo:

- `colors.ts`: Paleta de cores da aplicação.
- `fontfamily.ts`: Fontes utilizadas.

---

### `app/(auth)/`
Fluxo de autenticação:

- `login.tsx`: Tela de login.
- `register.tsx`: Tela de cadastro.

---

### `app/(adotante-tabs)/`
Fluxo do usuário **Adotante**:

- `pet-details/[id].tsx`: Detalhes de um pet com base no ID.

---

### `app/(ong-tabs)/`
Fluxo do usuário **ONG**:

- Telas voltadas para ONGs (cadastro e visualização de pets, gerenciamento de solicitações, etc.).

---

### `app/mock/`
Contém dados **mockados** usados para teste e desenvolvimento.

---

### Arquivos `_layout.tsx`

Arquivos responsáveis pelo layout das rotas:

- Navegação (headers, navbar).
- Organização visual das seções do app.

---

## 📱 Sobre o Projeto

O **Adote.me** é uma iniciativa que visa incentivar a adoção responsável de animais por meio da tecnologia. Através da plataforma, ONGs podem cadastrar pets e gerenciar solicitações, enquanto adotantes podem encontrar seu novo companheiro de forma prática e segura.

---

**Adote.me** – Promovendo a adoção responsável de animais! 🐶🐱
