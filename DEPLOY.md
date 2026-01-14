# 🚀 Deploy Gratuito - Guia Completo

## 📋 Visão Geral

Seu app será hospedado gratuitamente em:
- **Backend**: Render.com (gratuito)
- **Frontend Web**: Vercel (gratuito, ilimitado)
- **Database**: Supabase (já configurado, gratuito)
- **Mobile**: Expo + APK Android

---

## 1️⃣ BACKEND - Deploy no Render

### Preparar o Backend

**1. Criar arquivo de build:**

Edite `backend/package.json` e adicione:
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/app.js",
    "dev": "tsx watch src/app.ts"
  }
}
```

**2. Criar `render.yaml` na raiz do projeto:**
```yaml
services:
  - type: web
    name: app-estudos-backend
    runtime: node
    plan: free
    buildCommand: cd backend && npm install && npm run build
    startCommand: cd backend && npm start
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: NODE_ENV
        value: production
```

**3. Deploy:**
1. Acesse https://render.com
2. Conecte seu GitHub
3. Selecione o repositório
4. Render detecta automaticamente e faz deploy
5. Adicione `DATABASE_URL` nas variáveis de ambiente (sua string do Supabase)

**URL resultante:** `https://app-estudos-backend.onrender.com`

⚠️ **Importante:** Render free hiberna após 15min de inatividade (primeiro acesso demora ~30s)

---

## 2️⃣ FRONTEND WEB - Deploy na Vercel

### Preparar o Frontend

**1. Criar arquivo de configuração na raiz:**

`vercel.json`:
```json
{
  "builds": [
    {
      "src": "web/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/web/$1"
    }
  ]
}
```

**2. Atualizar `web/package.json`:**
```json
{
  "scripts": {
    "build": "vite build",
    "vercel-build": "vite build"
  }
}
```

**3. Criar `web/.env.production`:**
```env
VITE_API_URL=https://app-estudos-backend.onrender.com
```

**4. Atualizar `web/src/services/api.ts`:**
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**5. Deploy:**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
cd web
vercel --prod
```

Ou via interface:
1. Acesse https://vercel.com
2. Importe do GitHub
3. Configure: Root Directory = `web`
4. Deploy!

**URL resultante:** `https://app-estudos.vercel.app`

---

## 3️⃣ MOBILE - Expo + APK Android

### Opção A: Expo Go (Recomendado para testes)

Já funciona! Basta:
1. Usuários instalarem Expo Go
2. Você compartilhar o link: `exp://SEU_IP:8081`

### Opção B: Build APK (App Independente)

**1. Configurar `mobile/app.json`:**
```json
{
  "expo": {
    "name": "App Estudos",
    "slug": "app-estudos",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0a1929"
    },
    "android": {
      "package": "com.seuusername.appestudos",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0a1929"
      }
    },
    "extra": {
      "apiUrl": "https://app-estudos-backend.onrender.com"
    }
  }
}
```

**2. Atualizar `mobile/config.ts`:**
```typescript
import Constants from 'expo-constants';

export const config = {
  API_URL: Constants.expoConfig?.extra?.apiUrl || 'http://10.0.2.2:3000',
  // ...
};
```

**3. Build APK:**
```bash
cd mobile

# Instalar EAS CLI
npm install -g eas-cli

# Login no Expo
eas login

# Configurar build
eas build:configure

# Build APK
eas build --platform android --profile preview
```

Aguarde ~15 minutos, o APK ficará disponível para download!

**Distribuir:**
- Link direto do APK
- Google Drive
- Firebase App Distribution (gratuito)

---

## 4️⃣ CONFIGURAR CORS NO BACKEND

Atualize `backend/src/app.ts`:

```typescript
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://app-estudos.vercel.app', // Seu domínio Vercel
      'exp://localhost:8081', // Expo local
      /\.vercel\.app$/, // Qualquer preview da Vercel
    ],
    credentials: true,
  })
);
```

---

## 5️⃣ DOMÍNIO PERSONALIZADO (Opcional)

### Opção Gratuita: Usar subdomínios

- **Vercel**: Fornece `seu-app.vercel.app` (gratuito)
- **Render**: Fornece `seu-app.onrender.com` (gratuito)

### Comprar domínio próprio (~R$ 40/ano)

1. Compre em: Registro.br, Hostinger, Namecheap
2. Configure DNS:
   - A record → IP do Render
   - CNAME → Vercel
3. Adicione domínio nas plataformas

Exemplo: `estudos.seusite.com`

---

## 6️⃣ SCRIPT DE DEPLOY AUTOMÁTICO

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd backend && npm install
      - run: cd backend && npm run build
      # Render faz deploy automaticamente ao detectar push

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd web && npm install
      - run: cd web && npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 7️⃣ CHECKLIST DE DEPLOY

### Antes de fazer deploy:

- [ ] Backend compilando sem erros (`npm run build`)
- [ ] Frontend compilando sem erros (`npm run build`)
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado com domínios corretos
- [ ] Database URL do Supabase funcionando
- [ ] Testes básicos passando

### Após deploy:

- [ ] Testar login na versão web
- [ ] Testar adicionar questões
- [ ] Testar estatísticas
- [ ] Testar mobile (Expo Go ou APK)
- [ ] Verificar console de erros
- [ ] Monitorar logs do backend

---

## 8️⃣ CUSTOS E LIMITES

### Totalmente Gratuito:

| Serviço | Plano Gratuito | Limites |
|---------|----------------|---------|
| **Supabase** | Grátis | 500 MB database, 1 GB bandwidth |
| **Render** | Grátis | 750h/mês, hiberna após 15min |
| **Vercel** | Grátis | Ilimitado, 100 GB bandwidth |
| **Expo** | Grátis | Builds ilimitados |

**Total:** R$ 0/mês 🎉

### Se precisar escalar:

- **Render Pro**: $7/mês (sem hibernação)
- **Supabase Pro**: $25/mês (8 GB database)
- **Vercel Pro**: $20/mês (mais bandwidth)

---

## 9️⃣ ALTERNATIVAS GRATUITAS

### Backend:
- **Railway** (500h/mês grátis)
- **Fly.io** (3 apps grátis)
- **Cyclic** (ilimitado, mais lento)

### Frontend:
- **Netlify** (igual Vercel)
- **GitHub Pages** (apenas sites estáticos)
- **Cloudflare Pages** (ilimitado)

### Mobile:
- **TestFlight** (iOS, requer Mac)
- **Firebase App Distribution** (Android/iOS)
- **APK direto** (Android)

---

## 🔒 SEGURANÇA

### Boas práticas:

1. **Variáveis de ambiente:**
   - Nunca commite `.env`
   - Use secrets nas plataformas

2. **HTTPS:**
   - Render e Vercel fornecem SSL grátis

3. **Rate limiting:**
   ```typescript
   import rateLimit from 'express-rate-limit';
   
   app.use('/api/', rateLimit({
     windowMs: 15 * 60 * 1000, // 15 min
     max: 100 // 100 requisições
   }));
   ```

4. **Helmet.js:**
   ```bash
   npm install helmet
   ```
   ```typescript
   import helmet from 'helmet';
   app.use(helmet());
   ```

---

## 📱 COMPARTILHAR COM OUTROS USUÁRIOS

### Web:
```
Acesse: https://app-estudos.vercel.app
Crie sua conta e comece a estudar!
```

### Mobile (Expo Go):
```
1. Instale o Expo Go:
   Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   
2. Escaneie este QR code:
   [gerar QR code com: https://app-estudos.vercel.app]
```

### Mobile (APK):
```
Baixe o app Android:
https://drive.google.com/seu-apk-aqui
```

---

## 🚀 COMEÇAR AGORA

### Passo a Passo Rápido:

```bash
# 1. Commit tudo
git add .
git commit -m "Preparar para deploy"
git push origin main

# 2. Deploy backend (Render)
# - Acesse render.com
# - Connect GitHub → Deploy

# 3. Deploy frontend (Vercel)
cd web
npx vercel --prod

# 4. Testar!
# Acesse sua URL da Vercel
```

---

## 📞 SUPORTE

**Problemas comuns:**

1. **Backend não responde:**
   - Espere 30s (Render hibernado)
   - Verifique logs no Render

2. **CORS error:**
   - Adicione domínio Vercel no CORS
   - Restart do backend

3. **Build falha:**
   - Verifique Node version (18+)
   - `npm install` limpo

4. **Mobile não conecta:**
   - Use URL HTTPS do Render
   - Teste em navegador mobile primeiro

---

**Pronto!** Seu app estará disponível 24/7 gratuitamente! 🎉
