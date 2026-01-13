# 📁 ESTRUTURA COMPLETA DO PROJETO

Visualização completa da estrutura de arquivos e pastas do App de Controle de Estudos.

---

## 🌳 Árvore de Diretórios

```
📦 estudos-app/
│
├── 📄 README.md                    # Documentação principal
├── 📄 RESUMO-EXECUTIVO.md          # Resumo do projeto
├── 📄 ARQUITETURA.md               # Arquitetura técnica
├── 📄 INSTALACAO.md                # Guia de instalação
├── 📄 START.md                     # Início rápido
├── 📄 FLUXO-UX.md                  # Fluxo do usuário
├── 📄 COMANDOS.md                  # Comandos rápidos
├── 📄 INDICE.md                    # Índice geral
├── 📄 LICENSE                      # Licença MIT
├── 📄 .gitignore                   # Git ignore
├── 📄 package.json                 # Scripts globais
├── 📄 tsconfig.json                # TypeScript config
│
├── 📁 .vscode/                     # Configurações VS Code
│   ├── extensions.json             # Extensões recomendadas
│   └── settings.json               # Settings do projeto
│
├── 📁 backend/                     # Backend Node.js
│   ├── 📁 src/
│   │   ├── 📁 controllers/         # Controladores da API
│   │   │   ├── auth.controller.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── goal.controller.ts
│   │   │   ├── question.controller.ts
│   │   │   ├── study-plan.controller.ts
│   │   │   └── report.controller.ts
│   │   │
│   │   ├── 📁 models/              # Modelos de dados
│   │   │   ├── User.ts
│   │   │   ├── Goal.ts
│   │   │   ├── Question.ts
│   │   │   ├── StudySession.ts
│   │   │   ├── WeeklyPlan.ts
│   │   │   └── MonthlyReport.ts
│   │   │
│   │   ├── 📁 services/            # Lógica de negócio
│   │   │   ├── auth.service.ts
│   │   │   ├── goal.service.ts
│   │   │   ├── analytics.service.ts
│   │   │   ├── notification.service.ts
│   │   │   └── calendar.service.ts
│   │   │
│   │   ├── 📁 middlewares/         # Middlewares
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   └── validation.middleware.ts
│   │   │
│   │   ├── 📁 routes/              # Rotas da API
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 utils/               # Utilitários
│   │   │   ├── classification.ts
│   │   │   ├── calculations.ts
│   │   │   └── validators.ts
│   │   │
│   │   ├── 📁 config/              # Configurações
│   │   │   ├── database.ts
│   │   │   ├── firebase.ts
│   │   │   └── env.ts
│   │   │
│   │   └── 📄 app.ts               # App Express principal
│   │
│   ├── 📁 prisma/                  # Prisma ORM
│   │   ├── schema.prisma           # Schema do banco
│   │   └── migrations/             # Migrations
│   │
│   ├── 📁 tests/                   # Testes (a criar)
│   │   ├── unit/
│   │   └── integration/
│   │
│   ├── 📄 package.json             # Dependências backend
│   ├── 📄 tsconfig.json            # TypeScript config
│   └── 📄 .env.example             # Exemplo de variáveis
│
├── 📁 web/                         # Frontend Web React
│   ├── 📁 src/
│   │   ├── 📁 components/          # Componentes reutilizáveis
│   │   │   │
│   │   │   ├── 📁 Dashboard/       # Componentes do Dashboard
│   │   │   │   ├── WeekProgress.tsx
│   │   │   │   ├── NextSubject.tsx
│   │   │   │   └── Alerts.tsx
│   │   │   │
│   │   │   ├── 📁 Goals/           # Componentes de Metas
│   │   │   │   ├── GoalCard.tsx
│   │   │   │   ├── GoalForm.tsx
│   │   │   │   └── GoalProgress.tsx
│   │   │   │
│   │   │   ├── 📁 Questions/       # Componentes de Questões
│   │   │   │   ├── QuestionForm.tsx
│   │   │   │   └── QuestionHistory.tsx
│   │   │   │
│   │   │   ├── 📁 Analytics/       # Componentes de Análises
│   │   │   │   ├── PerformanceChart.tsx
│   │   │   │   ├── ClassificationBadge.tsx
│   │   │   │   └── ComparisonChart.tsx
│   │   │   │
│   │   │   ├── 📁 WeeklyPlan/      # Componentes do Plano
│   │   │   │   ├── PlanView.tsx
│   │   │   │   └── DayCard.tsx
│   │   │   │
│   │   │   └── 📁 Reports/         # Componentes de Relatórios
│   │   │       ├── MonthlyReport.tsx
│   │   │       └── ExportButton.tsx
│   │   │
│   │   ├── 📁 pages/               # Páginas da aplicação
│   │   │   ├── Home.tsx            # Dashboard principal
│   │   │   ├── Goals.tsx           # Gerenciar metas
│   │   │   ├── Questions.tsx       # Controle de questões
│   │   │   ├── Analytics.tsx       # Análises e gráficos
│   │   │   ├── WeeklyPlan.tsx      # Plano semanal
│   │   │   ├── Reports.tsx         # Relatórios mensais
│   │   │   ├── Settings.tsx        # Configurações
│   │   │   └── Login.tsx           # Login/Cadastro
│   │   │
│   │   ├── 📁 services/            # Serviços (API)
│   │   │   ├── api.ts              # Axios config
│   │   │   └── auth.ts             # Autenticação
│   │   │
│   │   ├── 📁 store/               # Estado global
│   │   │   └── useStore.ts         # Zustand store
│   │   │
│   │   ├── 📁 types/               # TypeScript types
│   │   │   └── index.ts            # Tipos compartilhados
│   │   │
│   │   ├── 📁 utils/               # Utilitários
│   │   │   └── helpers.ts
│   │   │
│   │   ├── 📄 App.tsx              # Componente principal
│   │   └── 📄 main.tsx             # Entry point
│   │
│   ├── 📁 public/                  # Arquivos públicos
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   ├── 📁 tests/                   # Testes (a criar)
│   │   └── __tests__/
│   │
│   ├── 📄 package.json             # Dependências frontend
│   ├── 📄 tsconfig.json            # TypeScript config
│   ├── 📄 vite.config.ts           # Vite config
│   ├── 📄 index.html               # HTML principal
│   └── 📄 .env                     # Variáveis de ambiente
│
├── 📁 mobile/                      # App Mobile (React Native)
│   ├── 📁 src/
│   │   ├── 📁 screens/             # Telas do app
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── GoalsScreen.tsx
│   │   │   ├── QuestionsScreen.tsx
│   │   │   ├── AnalyticsScreen.tsx
│   │   │   ├── WeeklyPlanScreen.tsx
│   │   │   └── ReportsScreen.tsx
│   │   │
│   │   ├── 📁 components/          # Componentes mobile
│   │   │   └── (similar ao web)
│   │   │
│   │   ├── 📁 navigation/          # Navegação
│   │   │   └── AppNavigator.tsx
│   │   │
│   │   ├── 📁 services/            # Serviços
│   │   │   ├── api.ts
│   │   │   ├── notifications.ts
│   │   │   └── calendar.ts
│   │   │
│   │   └── 📄 App.tsx              # App principal
│   │
│   ├── 📄 app.json                 # Expo config
│   ├── 📄 package.json             # Dependências mobile
│   └── 📄 tsconfig.json            # TypeScript config
│
└── 📁 docs/                        # Documentação adicional
    ├── 📁 images/                  # Imagens da docs
    ├── 📁 api/                     # API documentation
    └── 📁 design/                  # Design files

```

---

## 📊 ESTATÍSTICAS DO PROJETO

### Arquivos por Tipo

| Tipo         | Quantidade | Descrição                       |
| ------------ | ---------- | ------------------------------- |
| 📄 `.md`     | 8          | Documentação                    |
| 📄 `.ts`     | 35+        | TypeScript (backend + frontend) |
| 📄 `.tsx`    | 20+        | React components                |
| 📄 `.json`   | 10+        | Configurações                   |
| 📄 `.prisma` | 1          | Schema do banco                 |

**Total estimado:** 70+ arquivos

---

## 📦 TAMANHO ESTIMADO

```
📁 backend/           ~50 MB (com node_modules)
📁 web/               ~200 MB (com node_modules)
📁 mobile/            ~250 MB (com node_modules)
📁 docs/              ~5 MB
📄 Documentação       ~500 KB

Total (sem deps):     ~2 MB
Total (com deps):     ~500 MB
```

---

## 🔢 LINHAS DE CÓDIGO

| Parte        | Linhas                 |
| ------------ | ---------------------- |
| Backend      | ~2.000                 |
| Frontend Web | ~2.500                 |
| Mobile       | ~2.000 (a implementar) |
| Documentação | ~3.500                 |
| Testes       | ~1.000 (a implementar) |
| **TOTAL**    | **~11.000 linhas**     |

---

## 📋 CHECKLIST DE ARQUIVOS

### ✅ Documentação

- [x] README.md
- [x] RESUMO-EXECUTIVO.md
- [x] ARQUITETURA.md
- [x] INSTALACAO.md
- [x] START.md
- [x] FLUXO-UX.md
- [x] COMANDOS.md
- [x] INDICE.md

### ✅ Configuração

- [x] package.json (raiz)
- [x] tsconfig.json (raiz)
- [x] .gitignore
- [x] LICENSE
- [x] .vscode/settings.json
- [x] .vscode/extensions.json

### ✅ Backend

- [x] package.json
- [x] tsconfig.json
- [x] .env.example
- [x] prisma/schema.prisma
- [x] src/app.ts
- [x] src/middlewares/
- [x] src/services/
- [x] src/utils/
- [x] src/routes/

### ✅ Frontend Web

- [x] package.json
- [x] tsconfig.json
- [x] vite.config.ts
- [x] index.html
- [x] src/App.tsx
- [x] src/main.tsx
- [x] src/pages/
- [x] src/components/
- [x] src/services/
- [x] src/store/
- [x] src/types/

### 🚧 Mobile (A Implementar)

- [ ] package.json
- [ ] app.json
- [ ] src/App.tsx
- [ ] src/screens/
- [ ] src/components/
- [ ] src/navigation/

---

## 🎯 NAVEGAÇÃO RÁPIDA

### Por Funcionalidade

**Autenticação**

```
backend/src/controllers/auth.controller.ts
backend/src/services/auth.service.ts
backend/src/middlewares/auth.middleware.ts
web/src/pages/Login.tsx
web/src/services/auth.ts
```

**Metas**

```
backend/src/controllers/goal.controller.ts
backend/src/services/goal.service.ts
web/src/pages/Goals.tsx
web/src/components/Goals/
```

**Questões**

```
backend/src/controllers/question.controller.ts
web/src/pages/Questions.tsx
web/src/components/Questions/
```

**Análises**

```
backend/src/services/analytics.service.ts
web/src/pages/Analytics.tsx
web/src/components/Analytics/
```

**Plano Semanal**

```
backend/src/controllers/study-plan.controller.ts
web/src/pages/WeeklyPlan.tsx
web/src/components/WeeklyPlan/
```

**Relatórios**

```
backend/src/controllers/report.controller.ts
web/src/pages/Reports.tsx
web/src/components/Reports/
```

---

## 🔍 BUSCA POR TECNOLOGIA

### Node.js / Express

```
backend/src/app.ts
backend/src/routes/
backend/src/controllers/
backend/src/middlewares/
```

### Prisma

```
backend/prisma/schema.prisma
backend/src/services/ (usa Prisma Client)
```

### React

```
web/src/App.tsx
web/src/main.tsx
web/src/pages/
web/src/components/
```

### TypeScript

```
*.ts (backend)
*.tsx (frontend)
tsconfig.json (ambos)
```

### Material-UI

```
web/src/pages/ (usa componentes MUI)
web/src/components/ (usa componentes MUI)
```

### Recharts

```
web/src/components/Analytics/PerformanceChart.tsx
web/src/components/Analytics/ComparisonChart.tsx
web/src/pages/Analytics.tsx
```

### Zustand

```
web/src/store/useStore.ts
```

### Firebase

```
backend/src/services/notification.service.ts
backend/src/config/firebase.ts
```

### Google Calendar

```
backend/src/services/calendar.service.ts
```

---

## 📝 CONVENÇÕES DE NOMES

### Arquivos

- **Componentes:** PascalCase (e.g., `GoalCard.tsx`)
- **Services:** camelCase (e.g., `auth.service.ts`)
- **Utils:** camelCase (e.g., `calculations.ts`)
- **Páginas:** PascalCase (e.g., `Home.tsx`)

### Pastas

- **Backend:** kebab-case (e.g., `study-plan/`)
- **Frontend:** PascalCase (e.g., `Dashboard/`)

### Variáveis

- **TypeScript:** camelCase (e.g., `userName`)
- **Constants:** UPPER_CASE (e.g., `API_URL`)
- **Componentes:** PascalCase (e.g., `UserCard`)

---

## 🎨 ESTRUTURA VISUAL

```
Projeto Estudos
    │
    ├─── 📚 Documentação (8 arquivos MD)
    │
    ├─── ⚙️ Configuração (package.json, tsconfig, etc)
    │
    ├─── 🔧 Backend (Node.js + Express + Prisma)
    │    ├── Controllers (7 arquivos)
    │    ├── Services (5 arquivos)
    │    ├── Middlewares (3 arquivos)
    │    ├── Utils (3 arquivos)
    │    └── Prisma Schema (1 arquivo)
    │
    ├─── 🌐 Frontend Web (React + Vite + MUI)
    │    ├── Pages (8 páginas)
    │    ├── Components (15+ componentes)
    │    ├── Services (2 arquivos)
    │    ├── Store (1 arquivo)
    │    └── Types (1 arquivo)
    │
    └─── 📱 Mobile (React Native + Expo)
         ├── Screens (6 screens)
         ├── Components (reutilizados do web)
         └── Navigation (1 arquivo)
```

---

## 💾 BACKUP RECOMENDADO

### Arquivos Críticos

```
✅ Documentação (*.md)
✅ Código fonte (src/)
✅ Configurações (package.json, tsconfig.json)
✅ Schema Prisma (schema.prisma)
✅ Variáveis de ambiente (.env - seguro!)
```

### Não fazer backup

```
❌ node_modules/
❌ dist/
❌ .cache/
❌ logs/
```

---

## 🔗 DEPENDÊNCIAS ENTRE ARQUIVOS

### Fluxo de Dados

```
User → Frontend → API → Backend → Database
  ↓                                    ↓
Views    ←    State   ←   Services  ←  Data
```

### Imports Comuns

**Backend:**

```typescript
import { PrismaClient } from "@prisma/client";
import express from "express";
import { authMiddleware } from "./middlewares/auth.middleware";
```

**Frontend:**

```typescript
import React from "react";
import { useStore } from "./store/useStore";
import api from "./services/api";
import { Box, Card } from "@mui/material";
```

---

**📁 Esta é a estrutura completa do seu projeto!**

Use este documento como referência para navegar pelo código e entender a organização do projeto.

_Última atualização: 13 de Janeiro de 2026_
