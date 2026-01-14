# 📋 CHECKLIST DE DEPLOY

Marque cada item conforme avançar:

## ✅ PRÉ-DEPLOY

- [ ] Backend compila: `cd backend && npm run build`
- [ ] Frontend compila: `cd web && npm run build`
- [ ] Git atualizado: `git push origin main`
- [ ] Supabase funcionando (já está ✅)

---

## 🔧 RENDER (Backend)

- [ ] Cadastro criado em https://render.com
- [ ] Repositório conectado no Render
- [ ] Web Service criado
- [ ] Root Directory: `backend`
- [ ] Build Command: `npm install && npm run prisma:generate && npm run build`
- [ ] Start Command: `npm start`
- [ ] Plan: Free

### Variáveis de Ambiente:
- [ ] `DATABASE_URL` = sua-string-supabase
- [ ] `JWT_SECRET` = uma-chave-secreta
- [ ] `JWT_REFRESH_SECRET` = outra-chave-secreta
- [ ] `NODE_ENV` = production

- [ ] Deploy iniciado
- [ ] Deploy concluído
- [ ] **URL copiada**: `https://_____________________.onrender.com`

---

## 🌐 VERCEL (Frontend)

- [ ] Cadastro criado em https://vercel.com
- [ ] Repositório importado
- [ ] Framework: Vite
- [ ] Root Directory: `web`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### Variável de Ambiente:
- [ ] `VITE_API_URL` = URL-DO-RENDER-COPIADA-ACIMA

- [ ] Deploy iniciado
- [ ] Deploy concluído
- [ ] **URL acessada**: `https://_____________________.vercel.app`

---

## 📱 MOBILE

- [ ] Arquivo `mobile/config.ts` atualizado com URL do Render
- [ ] Commit: `git commit -m "Atualizar URL de produção"`
- [ ] Push: `git push`
- [ ] Testado com Expo Go

---

## 🧪 TESTES

- [ ] Abrir URL da Vercel no navegador
- [ ] Fazer login (ou criar conta)
- [ ] Adicionar uma questão
- [ ] Verificar estatísticas
- [ ] Testar tema claro/escuro
- [ ] Abrir no celular (mobile)
- [ ] Verificar se mobile conecta com API

---

## 🎉 COMPARTILHAR

- [ ] Enviar link web para amigos
- [ ] Ensinar a usar Expo Go no celular
- [ ] Ou gerar APK: `cd mobile && npx eas build`

---

## 📊 MONITORAMENTO

### Primeiras 24h:
- [ ] Verificar se backend não hiberna muito
- [ ] Checar tempo de resposta
- [ ] Ver logs no Render Dashboard
- [ ] Testar de diferentes dispositivos

### Se tiver problemas:
- [ ] Ler DEPLOY-RAPIDO.md seção "Problemas?"
- [ ] Verificar logs no Render
- [ ] Verificar console do navegador (F12)
- [ ] Confirmar variáveis de ambiente

---

## ⚡ OTIMIZAÇÕES FUTURAS (Opcional)

- [ ] Configurar domínio próprio
- [ ] Ativar GitHub Actions (deploy automático já configurado)
- [ ] Adicionar Google Analytics
- [ ] Publicar APK no Google Drive
- [ ] Considerar upgrade para Render Pro (sem hibernação)

---

**Progresso:** ___/30 itens concluídos

**Data de deploy:** ___/___/___

**URLs finais:**
- Web: _______________________________
- API: _______________________________
