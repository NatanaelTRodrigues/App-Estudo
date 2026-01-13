# 🚀 Configuração do Supabase

senha supa base: Natasmvp123.

## Passo 1: Criar conta no Supabase

1. Acesse: https://supabase.com
2. Clique em "Start your project"
3. Faça login com GitHub, Google ou Email
4. É **100% gratuito** para começar!

## Passo 2: Criar novo projeto

1. No dashboard, clique em **"New Project"**
2. Preencha os dados:
   - **Name**: `estudos-app` (ou o nome que preferir)
   - **Database Password**: Crie uma senha forte e **ANOTE** (você vai precisar!)
   - **Region**: Escolha `South America (São Paulo)` para melhor desempenho
   - **Pricing Plan**: Free (gratuito)
3. Clique em **"Create new project"**
4. ⏳ Aguarde 2-3 minutos enquanto o banco é provisionado

## Passo 3: Copiar a Connection String

1. No menu lateral, clique em **"Project Settings"** (ícone de engrenagem)
2. Clique em **"Database"**
3. Role até a seção **"Connection string"**
4. Selecione a aba **"URI"**
5. **IMPORTANTE**: Marque a opção "Display connection pooling string"
6. Copie a string que parece com isso:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
7. **Substitua `[YOUR-PASSWORD]`** pela senha que você criou no Passo 2

## Passo 4: Configurar no projeto

1. Abra o arquivo `backend/.env`
2. Substitua a linha `DATABASE_URL` pela connection string do Supabase:
   ```env
   DATABASE_URL="postgresql://postgres.xxxxx:SUA_SENHA@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```

## Passo 5: Aplicar as migrations

Execute no terminal:

```bash
cd backend
npx prisma db push
npx prisma generate
```

## ✅ Pronto!

Seu banco de dados PostgreSQL está rodando na nuvem do Supabase!

### Vantagens do Supabase:

- ✅ Gratuito para sempre (plano free)
- ✅ Banco gerenciado (sem instalação)
- ✅ Backups automáticos
- ✅ Interface visual para ver os dados
- ✅ 500MB de espaço no plano free
- ✅ Dashboard completo

### Dica: Ver os dados no Supabase

1. No menu lateral do Supabase, clique em **"Table Editor"**
2. Você verá todas as tabelas criadas (users, goals, questions, etc)
3. Pode adicionar/editar dados diretamente pela interface!

---

**Problemas?**

- Senha incorreta: Volte no Project Settings > Database e resete a senha
- Conexão lenta: Verifique se escolheu a região South America
- Erro de conexão: Verifique se copiou a string completa com `?pgbouncer=true`
