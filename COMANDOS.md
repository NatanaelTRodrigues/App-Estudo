# ⚡ COMANDOS RÁPIDOS - CHEAT SHEET

Referência rápida de comandos para desenvolvimento do App de Controle de Estudos.

---

## 🚀 INICIALIZAÇÃO

### Primeira Vez

```bash
# Na raiz do projeto
npm install              # Instalar dependências globais
npm run install:all      # Instalar todas as dependências (backend + web)
```

### Desenvolvimento

```bash
# Iniciar tudo de uma vez (recomendado)
npm run dev              # Backend + Frontend simultaneamente

# OU iniciar separadamente
npm run dev:backend      # Apenas backend
npm run dev:web          # Apenas frontend
npm run dev:mobile       # Apenas mobile
```

---

## 🗄️ BANCO DE DADOS (Prisma)

```bash
# Gerar Prisma Client
npm run prisma:generate

# Criar/Executar migrations
npm run prisma:migrate

# Abrir Prisma Studio (visualizar dados)
npm run prisma:studio

# Resetar banco (CUIDADO: apaga tudo)
cd backend && npm run prisma:migrate reset
```

---

## 📦 BUILD

```bash
# Build de tudo
npm run build

# Build separado
npm run build:backend    # Apenas backend
npm run build:web        # Apenas frontend
```

---

## 🧪 TESTES

```bash
# Todos os testes
npm test

# Separado
npm run test:backend
npm run test:web
```

---

## 🔍 LINTING

```bash
# Todos
npm run lint

# Separado
npm run lint:backend
npm run lint:web
```

---

## 🧹 LIMPEZA

```bash
# Limpar node_modules e dist
npm run clean

# Limpar e reinstalar tudo
npm run reset
```

---

## 📂 BACKEND

```bash
cd backend

# Desenvolvimento
npm run dev              # Inicia com tsx watch

# Build
npm run build            # Compila TypeScript

# Produção
npm run start            # Inicia build compilado

# Prisma
npm run prisma:generate  # Gera client
npm run prisma:migrate   # Executa migrations
npm run prisma:studio    # Abre Prisma Studio
```

---

## 🌐 FRONTEND WEB

```bash
cd web

# Desenvolvimento
npm run dev              # Inicia Vite dev server

# Build
npm run build            # Build para produção

# Preview
npm run preview          # Preview do build

# Lint
npm run lint             # ESLint
```

---

## 📱 MOBILE

```bash
cd mobile

# Iniciar Expo
npm start

# Abrir em plataformas
npm run android          # Abrir no Android
npm run ios              # Abrir no iOS

# Build
npm run build            # Build do app
```

---

## 🐳 DOCKER

```bash
# Subir todos os containers
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down

# Rebuild
docker-compose up -d --build
```

---

## 🗃️ POSTGRESQL

```bash
# Entrar no PostgreSQL
psql -U postgres

# Comandos dentro do psql
\l                       # Listar databases
\c estudos_db           # Conectar ao database
\dt                      # Listar tabelas
\d+ users               # Descrever tabela users
\q                       # Sair

# Backup
pg_dump -U postgres estudos_db > backup.sql

# Restore
psql -U postgres estudos_db < backup.sql
```

---

## 📦 REDIS

```bash
# Iniciar Redis
redis-server

# Cliente Redis
redis-cli

# Comandos dentro do redis-cli
ping                     # Testar conexão (retorna PONG)
keys *                   # Listar todas as keys
get <key>               # Obter valor
del <key>               # Deletar key
flushall                # Limpar tudo (CUIDADO!)
```

---

## 🔧 GIT

```bash
# Status
git status

# Adicionar arquivos
git add .

# Commit
git commit -m "feat: descrição da mudança"

# Push
git push origin main

# Pull
git pull origin main

# Nova branch
git checkout -b feature/nome-da-feature

# Ver branches
git branch -a

# Merge
git checkout main
git merge feature/nome-da-feature
```

---

## 📝 PADRÕES DE COMMIT

```bash
# Convenção de commits
feat:     Nova funcionalidade
fix:      Correção de bug
docs:     Documentação
style:    Formatação
refactor: Refatoração
test:     Testes
chore:    Tarefas gerais

# Exemplos
git commit -m "feat: adiciona tela de metas"
git commit -m "fix: corrige cálculo de progresso"
git commit -m "docs: atualiza README"
```

---

## 🔍 DEBUGGING

### Backend

```bash
# Logs detalhados
DEBUG=* npm run dev

# Node inspector
node --inspect src/app.ts
```

### Frontend

```bash
# React DevTools (browser extension)
# Redux DevTools (browser extension)

# Vite logs
npm run dev -- --debug
```

---

## 📊 MONITORAMENTO

```bash
# Ver processos Node.js
ps aux | grep node

# Matar processo na porta 3000
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Ver uso de memória
node --max-old-space-size=4096 src/app.ts
```

---

## 🌐 URLs IMPORTANTES

```
Backend:         http://localhost:3000
Frontend:        http://localhost:5173
Prisma Studio:   http://localhost:5555
API Docs:        http://localhost:3000/api-docs (quando implementado)
```

---

## 🔑 VARIÁVEIS DE AMBIENTE

### Backend (.env)

```bash
# Copiar exemplo
cp .env.example .env

# Variáveis principais
DATABASE_URL=postgresql://...
JWT_SECRET=...
PORT=3000
NODE_ENV=development
```

### Frontend (.env)

```bash
# Criar arquivo
echo "VITE_API_URL=http://localhost:3000/api" > .env
```

---

## 📦 DEPENDÊNCIAS

### Adicionar nova dependência

**Backend:**

```bash
cd backend
npm install nome-do-pacote
npm install -D nome-do-pacote  # Dev dependency
```

**Frontend:**

```bash
cd web
npm install nome-do-pacote
npm install -D nome-do-pacote  # Dev dependency
```

### Atualizar dependências

```bash
# Verificar outdated
npm outdated

# Atualizar
npm update

# Atualizar major versions (CUIDADO!)
npx npm-check-updates -u
npm install
```

---

## 🚨 SOLUÇÃO RÁPIDA DE PROBLEMAS

### Porta já em uso

```bash
# Mudar porta no .env ou matar processo
kill -9 $(lsof -ti:3000)  # Mac/Linux
```

### Erro de módulo não encontrado

```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Prisma não sincroniza

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
```

### Build quebrado

```bash
# Limpar cache
npm run clean
npm run install:all
npm run build
```

### Git conflicts

```bash
# Abortar merge
git merge --abort

# Resetar para último commit
git reset --hard HEAD

# Descartar mudanças locais
git checkout -- .
```

---

## 📚 RECURSOS ÚTEIS

### Documentação

```bash
# Ver README
cat README.md

# Ver todos os docs
ls -la *.md
```

### Logs

```bash
# Ver logs do backend
tail -f backend/logs/error.log

# Ver logs do frontend
tail -f web/logs/access.log
```

---

## ⚙️ CONFIGURAÇÃO RÁPIDA

### Setup completo em 5 minutos

```bash
# 1. Clone
git clone <repo-url>
cd estudos-app

# 2. Instale
npm run install:all

# 3. Configure .env
cp backend/.env.example backend/.env
# Edite backend/.env com suas configurações

# 4. Database
npm run prisma:migrate

# 5. Rode!
npm run dev
```

---

## 🎯 ATALHOS DO EDITOR (VS Code)

```
Ctrl + P         # Quick open
Ctrl + Shift + P # Command palette
Ctrl + `         # Terminal
Ctrl + B         # Toggle sidebar
Ctrl + Shift + F # Busca global
Ctrl + D         # Multi-cursor
Alt + Click      # Multi-cursor manual
F12              # Go to definition
Alt + F12        # Peek definition
Ctrl + Space     # IntelliSense
```

---

## 📊 MONITORAMENTO DE PERFORMANCE

```bash
# Análise de bundle
cd web
npm run build
npx vite-bundle-visualizer

# Memory usage
node --max-old-space-size=4096 --trace-gc src/app.ts
```

---

## 🔐 SEGURANÇA

```bash
# Audit de segurança
npm audit

# Fix vulnerabilities
npm audit fix

# Check outdated
npm outdated

# Update all
npm update
```

---

## 📝 NOTAS IMPORTANTES

⚠️ **Antes de commitar:**

- [ ] Rodar `npm run lint`
- [ ] Rodar `npm test`
- [ ] Verificar se build funciona
- [ ] Atualizar documentação se necessário

⚠️ **Antes de fazer deploy:**

- [ ] Testar em ambiente de staging
- [ ] Fazer backup do banco
- [ ] Verificar variáveis de ambiente
- [ ] Testar rollback

---

## 🚀 DEPLOY RÁPIDO

### Heroku (Backend)

```bash
heroku login
heroku create estudos-app-backend
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

### Vercel (Frontend)

```bash
cd web
vercel login
vercel deploy --prod
```

---

## 💡 DICAS

1. Use `npm run dev` na raiz para rodar tudo
2. Mantenha Prisma Studio aberto para visualizar dados
3. Use React DevTools no browser
4. Configure ESLint e Prettier no editor
5. Faça commits pequenos e frequentes
6. Leia a documentação em `*.md`

---

**📌 Salve este arquivo como favorito para referência rápida!**

_Última atualização: 13 de Janeiro de 2026_
