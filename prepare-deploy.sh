#!/bin/bash
# Script para preparar o projeto para deploy

echo "🚀 Preparando App Estudos para Deploy..."
echo ""

# 1. Verificar se está na raiz do projeto
if [ ! -f "package.json" ]; then
    echo "❌ Execute este script na raiz do projeto!"
    exit 1
fi

echo "✅ Diretório correto"
echo ""

# 2. Instalar dependências
echo "📦 Instalando dependências do backend..."
cd backend
npm install
echo "✅ Backend OK"
echo ""

echo "📦 Instalando dependências do frontend..."
cd ../web
npm install
echo "✅ Frontend OK"
echo ""

echo "📦 Instalando dependências do mobile..."
cd ../mobile
npm install
echo "✅ Mobile OK"
echo ""

cd ..

# 3. Testar builds locais
echo "🔨 Testando build do backend..."
cd backend
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Backend compila sem erros"
else
    echo "❌ Erro ao compilar backend - corrija antes de fazer deploy"
    exit 1
fi
echo ""

echo "🔨 Testando build do frontend..."
cd ../web
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Frontend compila sem erros"
else
    echo "❌ Erro ao compilar frontend - corrija antes de fazer deploy"
    exit 1
fi
echo ""

cd ..

# 4. Verificar arquivos necessários
echo "📋 Verificando arquivos de configuração..."

if [ -f "render.yaml" ]; then
    echo "✅ render.yaml existe"
else
    echo "⚠️  render.yaml não encontrado"
fi

if [ -f "vercel.json" ]; then
    echo "✅ vercel.json existe"
else
    echo "⚠️  vercel.json não encontrado"
fi

if [ -f "web/.env.production" ]; then
    echo "✅ .env.production existe"
    echo "⚠️  Lembre-se de atualizar VITE_API_URL após deploy do backend!"
else
    echo "⚠️  web/.env.production não encontrado"
fi

echo ""

# 5. Git status
echo "📊 Status do Git:"
git status --short
echo ""

# 6. Instruções finais
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ PROJETO PRONTO PARA DEPLOY!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Próximos passos:"
echo ""
echo "1️⃣  Commit e push:"
echo "   git add ."
echo "   git commit -m 'Preparar para deploy'"
echo "   git push origin main"
echo ""
echo "2️⃣  Deploy Backend (Render):"
echo "   Acesse: https://render.com"
echo "   Siga o guia: DEPLOY-RAPIDO.md"
echo ""
echo "3️⃣  Deploy Frontend (Vercel):"
echo "   Acesse: https://vercel.com"
echo "   Siga o guia: DEPLOY-RAPIDO.md"
echo ""
echo "4️⃣  Atualizar mobile/config.ts com URL do Render"
echo ""
echo "📖 Leia: DEPLOY-RAPIDO.md para instruções completas"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
