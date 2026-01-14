@echo off
REM Script para preparar o projeto para deploy no Windows

echo ========================================
echo  Preparando App Estudos para Deploy
echo ========================================
echo.

REM 1. Verificar diretorio
if not exist "package.json" (
    echo [ERRO] Execute este script na raiz do projeto!
    exit /b 1
)

echo [OK] Diretorio correto
echo.

REM 2. Instalar dependencias
echo [1/5] Instalando dependencias do backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dependencias do backend
    exit /b 1
)
echo [OK] Backend instalado
echo.

echo [2/5] Instalando dependencias do frontend...
cd ..\web
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dependencias do frontend
    exit /b 1
)
echo [OK] Frontend instalado
echo.

echo [3/5] Instalando dependencias do mobile...
cd ..\mobile
call npm install
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar dependencias do mobile
    exit /b 1
)
echo [OK] Mobile instalado
echo.

cd ..

REM 3. Testar builds
echo [4/5] Testando build do backend...
cd backend
call npm run build
if %errorlevel% neq 0 (
    echo [ERRO] Backend nao compila - corrija antes de fazer deploy
    cd ..
    exit /b 1
)
echo [OK] Backend compila sem erros
echo.

echo [5/5] Testando build do frontend...
cd ..\web
call npm run build
if %errorlevel% neq 0 (
    echo [ERRO] Frontend nao compila - corrija antes de fazer deploy
    cd ..
    exit /b 1
)
echo [OK] Frontend compila sem erros
echo.

cd ..

REM 4. Verificar arquivos
echo Verificando arquivos de configuracao...
if exist "render.yaml" (
    echo [OK] render.yaml existe
) else (
    echo [AVISO] render.yaml nao encontrado
)

if exist "vercel.json" (
    echo [OK] vercel.json existe
) else (
    echo [AVISO] vercel.json nao encontrado
)

if exist "web\.env.production" (
    echo [OK] .env.production existe
) else (
    echo [AVISO] web\.env.production nao encontrado
)
echo.

REM 5. Status do Git
echo Status do Git:
git status --short
echo.

REM 6. Instrucoes finais
echo ========================================
echo  PROJETO PRONTO PARA DEPLOY!
echo ========================================
echo.
echo Proximos passos:
echo.
echo 1) Commit e push:
echo    git add .
echo    git commit -m "Preparar para deploy"
echo    git push origin main
echo.
echo 2) Deploy Backend (Render):
echo    Acesse: https://render.com
echo    Siga o guia: DEPLOY-RAPIDO.md
echo.
echo 3) Deploy Frontend (Vercel):
echo    Acesse: https://vercel.com
echo    Siga o guia: DEPLOY-RAPIDO.md
echo.
echo 4) Atualizar mobile/config.ts com URL do Render
echo.
echo Leia DEPLOY-RAPIDO.md para instrucoes completas
echo ========================================
