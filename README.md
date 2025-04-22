# NotesApp

## Sobre o Projeto

NotesApp é um aplicativo móvel desenvolvido com React Native e Expo que permite aos usuários criar notas rápidas e compartilhá-las facilmente. Além disso, o aplicativo oferece um controle de brilho da tela para uma melhor experiência de leitura.

## Funcionalidades

- ✏️ Criação de notas rápidas
- 🔆 Controle de brilho da tela
- 🌓 Modo escuro e claro
- 📤 Compartilhamento de notas
- 📱 Interface moderna e responsiva

## Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- Expo Brightness
- Expo Sharing
- Expo File System
- React Native Gesture Handler

## Como Executar

### Pré-requisitos

Para executar este projeto, você precisará ter instalado em sua máquina:

- Node.js
- npm ou yarn
- Expo CLI

### Instalação

1. Clone este repositório:
```bash
git clone https://github.com/tati-sakuma/brilhoCompartiilhado.git
cd brilhoCompartiilhado
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o projeto:
```bash
npx expo start
# ou
yarn expo start
```

## Expo Go

O Expo Go é um aplicativo cliente disponível na App Store e Google Play Store que permite executar aplicativos Expo sem a necessidade de compilar o código nativo. Com ele, você pode visualizar seu aplicativo diretamente no seu dispositivo, facilitando o desenvolvimento e testes.

### Como usar o Expo Go com este projeto:

1. Baixe o aplicativo Expo Go:
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Inicie o servidor de desenvolvimento do projeto usando `npx expo start`

3. Escaneie o QR code que aparece no terminal ou na página web que se abre automaticamente usando o aplicativo Expo Go

4. O aplicativo NotesApp será carregado no seu dispositivo através do Expo Go

## Desenvolvimento com Expo

O Expo é uma plataforma e conjunto de ferramentas construídas em torno do React Native que ajuda a acelerar o desenvolvimento de aplicativos móveis. Com o Expo, você pode:

- Desenvolver para iOS e Android a partir de uma única base de código
- Acessar APIs nativas como câmera, geolocalização, e sensores sem configuração adicional
- Visualizar mudanças em tempo real enquanto desenvolve
- Compartilhar facilmente versões de desenvolvimento com colaboradores ou clientes

### Estrutura do Projeto

```
notes-app/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── screens/          # Telas do aplicativo
│   ├── theme/            # Configurações de tema
│   ├── hooks/            # Hooks personalizados
│   ├── utils/            # Funções utilitárias
│   └── types/            # Definições de tipos TypeScript
├── App.tsx               # Componente raiz
└── package.json          # Dependências do projeto
```

## Gerando APK/IPA

Para distribuir o aplicativo fora da loja, você pode gerar arquivos de instalação:

1. Para gerar um APK (Android):
```bash
eas build -p android --profile preview
```

2. Para gerar um IPA (iOS - requer conta de desenvolvedor Apple):
```bash
eas build -p ios --profile preview
```

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato!

---

Desenvolvido com 💜 e React Native