# 🚀 GUIA DE INÍCIO RÁPIDO

Execute este script para iniciar o projeto rapidamente:

## Windows (PowerShell)

```powershell
# Navegue até a pasta do projeto
cd "C:\Users\natanael.rodrigues\Documents\Estudos"

# Inicie o backend em uma nova janela
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm install; npm run dev"

# Aguarde 5 segundos
Start-Sleep -Seconds 5

# Inicie o frontend em outra janela
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd web; npm install; npm run dev"

Write-Host "✅ Projeto iniciado!" -ForegroundColor Green
Write-Host "📊 Backend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🌐 Frontend: http://localhost:5173" -ForegroundColor Cyan
```

## Linux/Mac (Bash)

```bash
#!/bin/bash

# Navegue até a pasta do projeto
cd ~/Documents/Estudos

# Inicie o backend em background
cd backend
npm install
npm run dev &

# Aguarde 5 segundos
sleep 5

# Inicie o frontend
cd ../web
npm install
npm run dev &

echo "✅ Projeto iniciado!"
echo "📊 Backend: http://localhost:3000"
echo "🌐 Frontend: http://localhost:5173"
```

## Usando npm scripts

Adicione ao `package.json` na raiz:

```json
{
  "name": "estudos-app",
  "scripts": {
    "install:all": "cd backend && npm install && cd ../web && npm install",
    "dev:backend": "cd backend && npm run dev",
    "dev:web": "cd web && npm run dev",
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:web\"",
    "build": "cd backend && npm run build && cd ../web && npm run build"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

Então execute:

```bash
# Instalar tudo
npm run install:all

# Rodar em desenvolvimento
npm run dev
```

---

## ⚡ Comandos Úteis

### Backend

```bash
cd backend
npm run dev          # Iniciar em desenvolvimento
npm run build        # Build para produção
npm run start        # Iniciar produção
npm run prisma:studio # Abrir Prisma Studio
```

### Frontend

```bash
cd web
npm run dev          # Iniciar em desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
```

### Mobile

```bash
cd mobile
npm start            # Iniciar Expo
npm run android      # Abrir no Android
npm run ios          # Abrir no iOS
```

---

## 🔄 Fluxo de Trabalho Recomendado

1. **Manhã**: Inicie os servidores

   ```bash
   npm run dev
   ```

2. **Durante o dia**: Trabalhe normalmente

   - Os servidores recarregam automaticamente
   - Prisma Studio para visualizar dados

3. **Fim do dia**: Commit e push
   ```bash
   git add .
   git commit -m "feat: nova funcionalidade"
   git push
   ```

---

## 📝 Primeiros Passos Após Instalação

1. ✅ Acesse `http://localhost:5173`
2. ✅ Crie sua conta
3. ✅ Configure seu plano semanal
4. ✅ Defina sua primeira meta
5. ✅ Comece a estudar!

---

**Happy Coding! 🎉**
