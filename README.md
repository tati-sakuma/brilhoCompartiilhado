# BrilhoCompartilhado

## Orientações de Instalação

### 1. Criando o projeto do zero
```bash
# 1.1 – Certifique‑se de ter Node.js (>=14.x) e npm ou Yarn instalados
# 1.2 – Crie o app com Expo
npx create-expo-app BrilhoCompartilhado --template blank

# 1.3 – Acesse o diretório criado
cd BrilhoCompartilhado

# 1.4 – Instale as bibliotecas necessárias
expo install expo-brightness expo-sharing expo-file-system @react-native-community/slider

# 1.5 – Inicie o Metro Bundler
npx expo start
