# 📱 Guia de Uso - Aplicativo Mobile (Expo)

## 🚀 Como Rodar no Emulador Android

### Pré-requisitos

1. **Android Studio** instalado com:

   - Android SDK
   - Android Virtual Device (AVD)
   - Emulador Android

2. **Configurar variáveis de ambiente:**
   ```bash
   ANDROID_HOME=C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk
   ```

### Iniciar o Emulador

**Opção 1: Via Expo (Automático)**

```bash
npm run android
```

Este comando vai:

- Iniciar o Metro bundler
- Abrir automaticamente o emulador Android
- Instalar e executar o app

**Opção 2: Manualmente**

```bash
# 1. Abra o Android Studio
# 2. AVD Manager → Play no emulador desejado
# 3. Execute:
npm run android
```

**Opção 3: Celular Físico (Expo Go)**

```bash
# 1. Instale o Expo Go no celular:
#    Android: https://play.google.com/store/apps/details?id=host.exp.exponent
#    iOS: https://apps.apple.com/app/expo-go/id982107779

# 2. Execute:
npm run mobile:start

# 3. Escaneie o QR code que aparece no terminal
#    Android: Use o app Expo Go
#    iOS: Use a câmera nativa do iPhone
```

## 🎯 Comandos Disponíveis

```bash
# Iniciar desenvolvimento mobile (abre menu com opções)
npm run dev:mobile

# Abrir no emulador Android
npm run android

# Abrir no simulador iOS (apenas Mac)
npm run ios

# Apenas iniciar o Metro bundler
npm run mobile:start
```

## 📱 Testando no Celular Real

### Android (via Expo Go)

1. Certifique-se que PC e celular estão na **mesma rede WiFi**
2. Instale o **Expo Go** na Play Store
3. Execute `npm run mobile:start`
4. No Expo Go, escaneie o QR code
5. O app abrirá instantaneamente

### iOS (via Expo Go)

1. Instale o **Expo Go** na App Store
2. Execute `npm run mobile:start`
3. Abra a câmera do iPhone
4. Aponte para o QR code
5. Toque na notificação que aparecer

## 🔧 Configuração Avançada

### Conectar ao Backend Local

O app mobile precisa se conectar ao backend rodando no seu PC.

**1. Descobrir seu IP local:**

```bash
# Windows
ipconfig

# Mac/Linux
ifconfig

# Procure por: IPv4 Address (ex: 192.168.1.100)
```

**2. Atualizar configuração:**

Edite `mobile/config.ts` (vamos criar):

```typescript
export const API_URL = "http://SEU_IP_LOCAL:3000";
// Exemplo: 'http://192.168.1.100:3000'
```

### Modo de Desenvolvimento

O Expo oferece várias opções ao pressionar `?` no terminal:

- `r` - Reload app
- `m` - Toggle menu
- `d` - Open developer menu
- `shift+d` - Show developer tools
- `j` - Open debugger

## 🎨 Features Implementadas

✅ **Tema Claro/Escuro**

- Toggle funcional
- Persistência local
- Transição suave

✅ **Interface Responsiva**

- Layout adaptável
- Touch gestures
- Scroll smooth

✅ **Dashboard**

- Cards informativos
- Estatísticas visuais
- Navegação intuitiva

## 🚧 Próximas Implementações

- [ ] Login e Autenticação
- [ ] Adicionar Questões
- [ ] Ver Estatísticas Completas
- [ ] Gráficos e Analytics
- [ ] Notificações Push
- [ ] Sincronização com Web
- [ ] Modo Offline

## 📝 Troubleshooting

### Emulador não abre

```bash
# Verifique se o Android Studio está instalado
# Inicie o emulador manualmente primeiro
# Depois execute: npm run android
```

### App não carrega

```bash
# Limpe o cache e reinstale
cd mobile
npm start -- --clear
```

### Erro de conexão com backend

```bash
# Verifique se o backend está rodando
cd backend
npm run dev

# Use o IP correto (não localhost no mobile)
# Android Emulator: use 10.0.2.2:3000
# iOS Simulator: use localhost:3000
# Dispositivo físico: use seu IP local
```

### QR Code não aparece

```bash
# Use o túnel do Expo (mais lento mas funciona)
npx expo start --tunnel
```

## 📚 Documentação Útil

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Expo Go App](https://expo.dev/client)
- [Android Studio Setup](https://developer.android.com/studio)

## 💡 Dicas

1. **Performance**: Use o modo Release para testar performance real
2. **Debug**: Use o React DevTools integrado
3. **Hot Reload**: Salve arquivos para ver mudanças instantâneas
4. **Logs**: Use `console.log` - aparece no terminal
5. **Erros**: Red screen mostra stack trace completo
