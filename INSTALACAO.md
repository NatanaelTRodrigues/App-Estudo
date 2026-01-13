# 📦 GUIA DE INSTALAÇÃO COMPLETO

Este guia fornece instruções detalhadas para configurar e executar o **App de Controle de Estudos** no seu ambiente local.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Essenciais

- ✅ **Node.js** v18.0.0 ou superior
- ✅ **npm** ou **yarn**
- ✅ **PostgreSQL** v14.0 ou superior
- ✅ **Git**

### Opcionais (mas recomendados)

- 🔸 **Redis** (para cache)
- 🔸 **Docker** (para containerização)
- 🔸 **VS Code** (editor recomendado)

---

## 🔧 Instalação Passo a Passo

### 1️⃣ Instalar Node.js

#### Windows

```bash
# Download do site oficial
https://nodejs.org/

# Ou usando Chocolatey
choco install nodejs
```

#### Linux/Mac

```bash
# Usando nvm (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Ou usando apt (Ubuntu/Debian)
sudo apt update
sudo apt install nodejs npm
```

**Verificar instalação:**

```bash
node --version  # deve mostrar v18.x.x
npm --version   # deve mostrar 9.x.x ou superior
```

---

### 2️⃣ Instalar PostgreSQL

#### Windows

```bash
# Download do instalador
https://www.postgresql.org/download/windows/

# Ou usando Chocolatey
choco install postgresql
```

#### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Mac

```bash
brew install postgresql
brew services start postgresql
```

**Criar banco de dados:**

```bash
# Entrar no PostgreSQL
psql -U postgres

# Criar banco
CREATE DATABASE estudos_db;

# Criar usuário (opcional)
CREATE USER estudos_user WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE estudos_db TO estudos_user;

# Sair
\q
```

---

### 3️⃣ Instalar Redis (Opcional)

#### Windows

```bash
# Usando WSL ou Docker
docker run --name redis -p 6379:6379 -d redis
```

#### Linux

```bash
sudo apt install redis-server
sudo systemctl start redis
sudo systemctl enable redis
```

#### Mac

```bash
brew install redis
brew services start redis
```

**Testar Redis:**

```bash
redis-cli ping
# Resposta: PONG
```

---

### 4️⃣ Clonar o Repositório

```bash
# Clonar o projeto
git clone https://github.com/seu-usuario/estudos-app.git
cd estudos-app
```

---

### 5️⃣ Configurar Backend

```bash
cd backend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Editar .env no seu editor favorito
code .env  # ou notepad .env
```

**Configurar `.env`:**

```env
# Database
DATABASE_URL="postgresql://postgres:senha@localhost:5432/estudos_db"

# JWT
JWT_SECRET="seu_secret_super_seguro_aqui_12345"
JWT_EXPIRES_IN="7d"
REFRESH_TOKEN_SECRET="seu_refresh_secret_aqui_67890"
REFRESH_TOKEN_EXPIRES_IN="30d"

# Server
PORT=3000
NODE_ENV="development"

# Redis (opcional)
REDIS_URL="redis://localhost:6379"

# Frontend URL (CORS)
FRONTEND_URL="http://localhost:5173"
```

**Executar migrations:**

```bash
# Gerar Prisma Client
npm run prisma:generate

# Criar tabelas no banco
npm run prisma:migrate

# (Opcional) Abrir Prisma Studio para ver os dados
npm run prisma:studio
```

**Iniciar backend:**

```bash
npm run dev
```

✅ Backend rodando em `http://localhost:3000`

**Testar backend:**

```bash
curl http://localhost:3000/health
# Resposta: {"status":"OK","timestamp":"..."}
```

---

### 6️⃣ Configurar Frontend Web

**Abrir novo terminal:**

```bash
cd web

# Instalar dependências
npm install

# Criar arquivo .env
echo VITE_API_URL=http://localhost:3000/api > .env

# OU criar manualmente com o conteúdo:
# VITE_API_URL=http://localhost:3000/api
```

**Iniciar frontend:**

```bash
npm run dev
```

✅ Frontend rodando em `http://localhost:5173`

**Acessar no navegador:**

```
http://localhost:5173
```

---

### 7️⃣ Configurar Mobile (React Native)

```bash
cd mobile

# Instalar dependências
npm install

# Instalar Expo CLI globalmente (se ainda não tiver)
npm install -g expo-cli

# Iniciar Expo
npm start
```

**Opções:**

- Pressione `a` para abrir no Android Emulator
- Pressione `i` para abrir no iOS Simulator
- Escaneie o QR Code com o app Expo Go no seu celular

---

## 🔐 Configurar Integrações (Opcional)

### Firebase (Notificações Push)

1. Criar projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ativar Cloud Messaging
3. Baixar credenciais de serviço
4. Adicionar ao `.env`:

```env
FIREBASE_PROJECT_ID="seu-projeto-id"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk@projeto.iam.gserviceaccount.com"
```

### Google Calendar API

1. Criar projeto no [Google Cloud Console](https://console.cloud.google.com/)
2. Ativar Google Calendar API
3. Criar credenciais OAuth 2.0
4. Adicionar ao `.env`:

```env
GOOGLE_CLIENT_ID="seu-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="seu-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:3000/auth/google/callback"
```

---

## 🐳 Usando Docker (Alternativa)

### Docker Compose

Criar `docker-compose.yml` na raiz:

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: estudos_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: senha
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgresql://postgres:senha@postgres:5432/estudos_db
      REDIS_URL: redis://redis:6379

volumes:
  postgres_data:
```

**Executar:**

```bash
docker-compose up -d
```

---

## ✅ Verificar Instalação

### 1. Backend

```bash
curl http://localhost:3000/health
# ✅ {"status":"OK"}
```

### 2. Frontend

```bash
# Abrir navegador em http://localhost:5173
# ✅ Deve carregar a página de login
```

### 3. Banco de Dados

```bash
psql -U postgres -d estudos_db -c "\dt"
# ✅ Deve listar todas as tabelas
```

### 4. Redis (se instalado)

```bash
redis-cli ping
# ✅ PONG
```

---

## 🎨 Extensões Recomendadas (VS Code)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next",
    "dsznajder.es7-react-js-snippets",
    "bradlc.vscode-tailwindcss"
  ]
}
```

---

## 🐛 Solução de Problemas

### Erro: "Cannot connect to database"

```bash
# Verificar se PostgreSQL está rodando
sudo systemctl status postgresql  # Linux
brew services list  # Mac

# Verificar conexão
psql -U postgres -c "SELECT 1"
```

### Erro: "Port 3000 already in use"

```bash
# Encontrar processo usando a porta
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Matar processo
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

### Erro: "Module not found"

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro de Migrations

```bash
# Resetar banco (CUIDADO: apaga dados)
npm run prisma:migrate reset

# Ou executar novamente
npm run prisma:migrate dev
```

---

## 📚 Próximos Passos

Depois de instalar tudo:

1. ✅ Criar sua primeira conta
2. ✅ Configurar plano semanal
3. ✅ Definir primeira meta
4. ✅ Registrar sessões de estudo
5. ✅ Visualizar análises

---

## 💡 Dicas

- Use **nodemon** para auto-reload no desenvolvimento
- Configure **Prettier** e **ESLint** para formatação
- Use **Prisma Studio** para visualizar dados
- Ative **source maps** para debugging
- Configure **husky** para git hooks

---

## 📞 Suporte

Problemas na instalação? Abra uma [issue no GitHub](https://github.com/seu-usuario/estudos-app/issues) com:

- Sistema operacional
- Versão do Node.js
- Mensagem de erro completa
- Steps para reproduzir o problema

---

**🎉 Instalação completa! Bons estudos!**
