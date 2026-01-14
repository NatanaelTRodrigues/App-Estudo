# 🚀 Deploy Rápido em 5 Minutos

## 1️⃣ BACKEND (Render) - 2 minutos

### Passo a passo:

1. **Acesse** https://render.com
2. **Cadastre-se** (pode usar conta GitHub)
3. **New + → Web Service**
4. **Connect GitHub** → Selecione seu repositório `App-Estudo`
5. **Configure:**
   - **Name**: `app-estudos-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run prisma:generate && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

6. **Environment Variables** (clique em "Advanced"):
   ```
   DATABASE_URL = postgresql://postgres.bqtvlrdnisxdxlecucjx:Natasmvp123.@aws-1-sa-east-1.pooler.supabase.com:6543/postgres
   JWT_SECRET = sua-chave-secreta-aqui-123456
   JWT_REFRESH_SECRET = sua-chave-refresh-aqui-789012
   NODE_ENV = production
   PORT = 3000
   ```

7. **Create Web Service** → Aguarde o deploy (~3 minutos)

8. **Copie a URL**: `https://app-estudos-backend.onrender.com`

---

## 2️⃣ FRONTEND (Vercel) - 2 minutos

### Método 1: Interface Web (Mais Fácil)

1. **Acesse** https://vercel.com
2. **Login com GitHub**
3. **Add New... → Project**
4. **Import** seu repositório `App-Estudo`
5. **Configure:**
   - **Framework Preset**: `Vite`
   - **Root Directory**: `web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. **Environment Variables**:
   ```
   VITE_API_URL = https://app-estudos-backend.onrender.com
   ```
   (Use a URL copiada do Render no passo 1)

7. **Deploy** → Aguarde (~2 minutos)

8. **Acesse seu app**: `https://app-estudos.vercel.app` 🎉

### Método 2: Terminal (Alternativo)

```bash
# Instalar CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd web
vercel --prod

# Cole a URL do backend quando solicitado
```

---

## 3️⃣ MOBILE (Atualizar Config) - 1 minuto

Edite `mobile/config.ts`:

```typescript
export const config = {
  API_URL: __DEV__
    ? "http://10.0.2.2:3000"
    : "https://app-estudos-backend.onrender.com",  // ✅ Cole sua URL do Render
  TIMEOUT: 10000,
  // ...
};
```

**Pronto!** Mobile agora conecta com backend online

Para gerar APK:
```bash
cd mobile
npx eas build --platform android --profile preview
```

---

## ✅ TESTAR TUDO

### Web:
1. Acesse `https://app-estudos.vercel.app`
2. Crie uma conta
3. Adicione questões
4. Verifique estatísticas

### Mobile:
1. Abra Expo Go
2. Escaneie QR code (`npm run android` na pasta raiz)
3. App carrega com backend online

---

## 🔧 ATUALIZAR DEPOIS DO DEPLOY

Sempre que fizer mudanças:

```bash
git add .
git commit -m "Atualização"
git push origin main
```

**Vercel** faz deploy automático! ✅  
**Render** faz deploy automático! ✅

---

## ⚠️ PRIMEIRO ACESSO LENTO

O Render free hiberna após 15min sem uso.

**Solução**: Primeiro acesso demora ~30s para "acordar" o servidor.

Depois fica rápido! ⚡

---

## 📱 COMPARTILHAR COM AMIGOS

### Web:
```
Acesse: https://app-estudos.vercel.app
Crie sua conta e comece!
```

### Mobile:
```
1. Instale: Expo Go (Google Play)
2. Abra este link: exp://seu-ip:8081
   (ou escaneie QR code quando rodar o app)
```

---

## 🆘 PROBLEMAS?

### Backend não responde:
- Espere 30 segundos (está acordando)
- Verifique logs no Render Dashboard

### CORS error:
- Certifique-se que adicionou o domínio Vercel no backend
- Já está configurado! Verifique `backend/src/app.ts`

### Build falhou:
- Verifique variáveis de ambiente
- Node version deve ser 18+

### Mobile não conecta:
- Atualize URL em `mobile/config.ts`
- Use HTTPS (Render fornece)
- Teste no navegador mobile primeiro

---

## 💰 CUSTOS

**R$ 0,00 / mês** com os planos free! 🎉

Limites:
- Render: 750h/mês (mais que suficiente)
- Vercel: Ilimitado
- Supabase: 500 MB database

---

**Pronto! Seu app está no ar!** 🚀
