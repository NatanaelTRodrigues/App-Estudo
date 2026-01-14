# 📱 Acesso Mobile

## Como acessar o app no celular

### Método 1: Via Navegador (Recomendado) 🌐

1. **No computador**, execute:

   ```bash
   npm run android
   ```

2. **Anote o IP local** que aparecerá (exemplo: `192.168.1.100`)

3. **No celular**:

   - Conecte-se à **mesma rede WiFi** do computador
   - Abra o navegador (Chrome, Safari, etc.)
   - Digite na barra de endereço: `http://SEU_IP:5173`
   - Exemplo: `http://192.168.1.100:5173`

4. **Instalar como PWA** (Opcional):
   - No Chrome: Menu → "Adicionar à tela inicial"
   - No Safari: Compartilhar → "Adicionar à Tela de Início"
   - O app funcionará como um aplicativo nativo! 📲

### Método 2: Ngrok (Acesso pela Internet) 🌍

Se quiser acessar de qualquer lugar:

1. Instale o ngrok: https://ngrok.com/download

2. Execute:

   ```bash
   ngrok http 5173
   ```

3. Use a URL fornecida (ex: `https://xxxx.ngrok.io`) no celular

### Funcionalidades Mobile ✨

✅ **Notificações Push** - Funcionam em navegadores mobile
✅ **Modo Offline** - PWA armazena dados localmente  
✅ **Responsivo** - Interface adaptada para touch
✅ **Modo Claro/Escuro** - Alterna conforme preferência
✅ **Instalar na tela** - Funciona como app nativo

### Dicas 💡

- **Notificações**: Permita notificações no navegador quando solicitado
- **Performance**: Limpe o cache se estiver lento
- **Atualizações**: Recarregue a página para ver mudanças
- **Internet**: Backend precisa estar rodando no computador

### Troubleshooting 🔧

**Não consegue conectar?**

- Verifique se está na mesma rede WiFi
- Desative firewall temporariamente
- Use `ipconfig` (Windows) ou `ifconfig` (Mac/Linux) para ver o IP

**Notificações não funcionam?**

- Verifique permissões do navegador
- Alguns navegadores mobile limitam notificações
- Use Chrome ou Safari para melhor suporte

**App lento?**

- Feche outras abas do navegador
- Limpe o cache e dados do site
- Reinicie o navegador
