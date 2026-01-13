# 🎓 ARQUITETURA - APP DE CONTROLE TOTAL DE ESTUDOS

## 📋 Visão Geral

Sistema completo de gestão de estudos com suporte mobile e web, permitindo controle total do progresso, metas, questões e análises de desempenho.

---

## 🏗️ ARQUITETURA TÉCNICA

### Stack Tecnológico

#### **Backend**

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL (principal) + Redis (cache)
- **ORM:** Prisma
- **Autenticação:** JWT + Refresh Tokens
- **Notificações:** Firebase Cloud Messaging (FCM)
- **Calendário:** Google Calendar API / Apple Calendar API

#### **Frontend Web**

- **Framework:** React 18+
- **Linguagem:** TypeScript
- **Build Tool:** Vite
- **Roteamento:** React Router v6
- **Estado Global:** Zustand
- **UI Components:** Material-UI (MUI) / Ant Design
- **Gráficos:** Recharts
- **Formulários:** React Hook Form + Zod
- **HTTP Client:** Axios
- **PWA:** Workbox

#### **Mobile**

- **Framework:** React Native + Expo
- **Linguagem:** TypeScript
- **Navegação:** React Navigation
- **UI Components:** React Native Paper
- **Gráficos:** Victory Native
- **Notificações:** Expo Notifications
- **Calendário:** React Native Calendars
- **Armazenamento Local:** AsyncStorage / Secure Store

---

## 🗂️ ESTRUTURA DE PASTAS

```
estudos-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── goal.controller.ts
│   │   │   ├── question.controller.ts
│   │   │   ├── study-plan.controller.ts
│   │   │   └── report.controller.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Goal.ts
│   │   │   ├── Question.ts
│   │   │   ├── StudySession.ts
│   │   │   ├── WeeklyPlan.ts
│   │   │   └── MonthlyReport.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── goal.service.ts
│   │   │   ├── analytics.service.ts
│   │   │   ├── notification.service.ts
│   │   │   └── calendar.service.ts
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   └── validation.middleware.ts
│   │   ├── routes/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── classification.ts
│   │   │   ├── calculations.ts
│   │   │   └── validators.ts
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── firebase.ts
│   │   │   └── env.ts
│   │   └── app.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── package.json
│   └── tsconfig.json
│
├── web/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   │   ├── WeekProgress.tsx
│   │   │   │   ├── NextSubject.tsx
│   │   │   │   └── Alerts.tsx
│   │   │   ├── Goals/
│   │   │   │   ├── GoalCard.tsx
│   │   │   │   ├── GoalForm.tsx
│   │   │   │   └── GoalProgress.tsx
│   │   │   ├── Questions/
│   │   │   │   ├── QuestionForm.tsx
│   │   │   │   └── QuestionHistory.tsx
│   │   │   ├── Analytics/
│   │   │   │   ├── PerformanceChart.tsx
│   │   │   │   ├── ClassificationBadge.tsx
│   │   │   │   └── ComparisonChart.tsx
│   │   │   ├── WeeklyPlan/
│   │   │   │   ├── PlanView.tsx
│   │   │   │   └── DayCard.tsx
│   │   │   └── Reports/
│   │   │       ├── MonthlyReport.tsx
│   │   │       └── ExportButton.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Goals.tsx
│   │   │   ├── Questions.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── WeeklyPlan.tsx
│   │   │   ├── Reports.tsx
│   │   │   └── Settings.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   └── auth.ts
│   │   ├── store/
│   │   │   └── useStore.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── helpers.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── mobile/
│   ├── src/
│   │   ├── screens/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── GoalsScreen.tsx
│   │   │   ├── QuestionsScreen.tsx
│   │   │   ├── AnalyticsScreen.tsx
│   │   │   ├── WeeklyPlanScreen.tsx
│   │   │   └── ReportsScreen.tsx
│   │   ├── components/
│   │   │   └── (mesma estrutura do web)
│   │   ├── navigation/
│   │   │   └── AppNavigator.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── notifications.ts
│   │   │   └── calendar.ts
│   │   └── App.tsx
│   ├── app.json
│   └── package.json
│
└── shared/
    └── types/
        └── index.ts
```

---

## 📊 MODELO DE DADOS

### **User (Usuário)**

```typescript
{
  id: string
  email: string
  name: string
  password: string (hash)
  createdAt: Date
  goals: Goal[]
  questions: Question[]
  studySessions: StudySession[]
  weeklyPlan: WeeklyPlan
}
```

### **Goal (Meta Semanal)**

```typescript
{
  id: string
  userId: string
  weekNumber: number
  year: number
  targetHours: number
  currentHours: number
  targetSubjects: number
  currentSubjects: number
  targetQuestions: number
  currentQuestions: number
  startDate: Date
  endDate: Date
  progress: number (%)
  status: 'active' | 'completed' | 'failed'
}
```

### **Question (Questões)**

```typescript
{
  id: string
  userId: string
  subject: string
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  date: Date
  weekNumber: number
  accuracy: number (%)
}
```

### **StudySession (Sessão de Estudo)**

```typescript
{
  id: string
  userId: string
  subject: string
  duration: number (minutos)
  date: Date
  weekNumber: number
  completed: boolean
  notes?: string
}
```

### **WeeklyPlan (Plano Semanal)**

```typescript
{
  id: string;
  userId: string;
  monday: DayPlan;
  tuesday: DayPlan;
  wednesday: DayPlan;
  thursday: DayPlan;
  friday: DayPlan;
  saturday: DayPlan;
  sunday: DayPlan;
}

type DayPlan = {
  subjects: Array<{
    name: string;
    duration: number;
    completed: boolean;
  }>;
  description?: string;
};
```

### **MonthlyReport (Relatório Mensal)**

```typescript
{
  id: string;
  userId: string;
  month: number;
  year: number;
  totalHours: number;
  totalQuestions: number;
  averageAccuracy: number;
  bestWeek: number;
  worstWeek: number;
  classification: "ruim" | "regular" | "bom" | "ótimo";
  generatedAt: Date;
}
```

---

## 🎯 LÓGICA DE CLASSIFICAÇÃO

### **Critérios de Desempenho**

```typescript
function classifyPerformance(accuracy: number): Classification {
  if (accuracy < 50) return "❌ Ruim";
  if (accuracy < 70) return "⚠️ Regular";
  if (accuracy < 85) return "✅ Bom";
  return "⭐ Ótimo";
}
```

### **Cálculos de Progresso**

```typescript
// Progresso de meta semanal
goalProgress = (currentValue / targetValue) * 100;

// Taxa de acerto
accuracy = (correctAnswers / totalQuestions) * 100;

// Comparação entre semanas
weekComparison = ((currentWeek - previousWeek) / previousWeek) * 100;
```

---

## 🔔 SISTEMA DE NOTIFICAÇÕES

### **Tipos de Notificações**

1. **Lembrete de Estudo**

   - Horário: Baseado no plano semanal
   - Mensagem: "📚 Hora de estudar {matéria}!"

2. **Meta Semanal**

   - Horário: Segunda-feira 8h
   - Mensagem: "🎯 Nova semana! Defina suas metas"

3. **Simulado**

   - Horário: Sábado 8h
   - Mensagem: "📝 Dia de simulado!"

4. **Revisão**

   - Horário: Sexta-feira 19h
   - Mensagem: "🔄 Hora de revisar os erros da semana"

5. **Relatório Mensal**
   - Horário: Último dia do mês 20h
   - Mensagem: "📊 Seu relatório mensal está pronto!"

---

## 📱 FLUXO DO USUÁRIO

### **1. Onboarding**

```
Login/Cadastro → Configurar Plano Semanal → Definir Primeira Meta → Dashboard
```

### **2. Fluxo Diário**

```
Dashboard → Ver Próxima Matéria → Registrar Sessão de Estudo → Registrar Questões
```

### **3. Fluxo Semanal**

```
Definir Metas → Acompanhar Progresso → Visualizar Gráficos → Ajustar Plano
```

### **4. Fluxo Mensal**

```
Receber Relatório → Analisar Desempenho → Exportar Dados → Planejar Próximo Mês
```

---

## 🎨 ESTRUTURA DE TELAS

### **1. Dashboard (Home)**

- Cards de progresso semanal
- Próxima matéria do plano
- Alertas e lembretes
- Gráfico resumido de desempenho

### **2. Metas**

- Criar nova meta semanal
- Lista de metas anteriores
- Progresso em tempo real
- Comparação entre semanas

### **3. Questões**

- Formulário de registro
- Histórico por matéria
- Estatísticas de acerto/erro
- Filtros por período

### **4. Análises**

- Gráfico de desempenho semanal
- Evolução de acertos vs erros
- Classificação automática
- Tendências

### **5. Plano Semanal**

- Visualização do plano fixo
- Marcação de tarefas concluídas
- Integração com calendário
- Edição do plano

### **6. Relatórios**

- Relatório mensal automático
- Estatísticas completas
- Exportar PDF/CSV
- Histórico de relatórios

### **7. Configurações**

- Preferências de notificação
- Configurar horários de alarme
- Sincronização de calendário
- Temas e aparência

---

## 🔐 SEGURANÇA

- JWT com refresh tokens
- Hash de senhas (bcrypt)
- Rate limiting
- CORS configurado
- Validação de dados (Zod)
- HTTPS obrigatório em produção

---

## 📈 INTEGAÇÕES

### **Calendário**

- Google Calendar API
- Apple Calendar (CalDAV)
- Sincronização bidirecional

### **Notificações**

- Firebase Cloud Messaging (Android/iOS/Web)
- Push Notifications
- Lembretes locais (mobile)

### **Exportação**

- PDF (jsPDF)
- CSV (Papa Parse)
- Excel (XLSX)

---

## 🚀 ROADMAP DE IMPLEMENTAÇÃO

### **Fase 1: MVP (4-6 semanas)**

- ✅ Autenticação
- ✅ CRUD de metas
- ✅ CRUD de questões
- ✅ Dashboard básico
- ✅ Plano semanal

### **Fase 2: Análises (2-3 semanas)**

- ✅ Gráficos e estatísticas
- ✅ Sistema de classificação
- ✅ Comparações

### **Fase 3: Integrações (3-4 semanas)**

- ✅ Notificações
- ✅ Calendário
- ✅ Relatório mensal

### **Fase 4: Mobile (4-5 semanas)**

- ✅ App React Native
- ✅ Sincronização
- ✅ Push notifications

### **Fase 5: Extras (2-3 semanas)**

- ✅ Exportação de dados
- ✅ PWA
- ✅ Otimizações

---

## 📝 CONSIDERAÇÕES FINAIS

Este é um sistema robusto, escalável e preparado para crescimento. A arquitetura permite adicionar novos recursos facilmente e mantém separação clara de responsabilidades.

**Próximos passos:** Implementar o código base de cada camada seguindo esta arquitetura.
