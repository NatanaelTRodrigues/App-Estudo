# 📚 App de Controle de Estudos

Sistema completo de controle e acompanhamento de estudos com funcionalidades de metas, questões, analytics e relatórios.

## ✨ Funcionalidades Implementadas

### 🏠 Dashboard (Home)

- Cards interativos com progresso de horas, questões e matérias
- Resumo semanal com estatísticas detalhadas
- Taxa de acerto e metas restantes
- Alertas personalizados de progresso
- Ações rápidas para todas as seções

### 🎯 Metas Semanais

- Criar metas com targets de horas, matérias e questões
- Visualizar histórico completo de metas
- Progresso individual para cada meta (horas, questões, matérias)
- Status automático: Em andamento, Concluída, Não atingida
- Cards com barras de progresso coloridas

### 📝 Questões

- Formulário para adicionar questões diárias
- Seleção de matéria (11 opções)
- Contagem automática de acertos/erros
- Cálculo de acurácia em tempo real
- Atualização automática da meta atual

### 📊 Analytics

- Classificação automática (Ruim/Regular/Bom/Ótimo)
- Estatísticas gerais (total de questões, acertos, erros)
- Gráfico de barras por matéria
- Gráfico de pizza com distribuição de questões
- Detalhes individuais por matéria com acurácia

### 📅 Plano Semanal

- Visualização dos 7 dias da semana
- Adicionar/remover tarefas de estudo
- Marcar tarefas como concluídas
- Barra de progresso por dia
- Visual especial para fins de semana
- Persistência local (localStorage)

### 📑 Relatórios Mensais

- Seleção de mês e ano
- Resumo completo do mês (horas, questões, taxa de acerto)
- Classificação mensal com emoji
- Progresso de metas concluídas
- Visualização individual de cada meta do mês

### ⚙️ Configurações

- Editar perfil (nome, email)
- Alterar senha
- Configurar notificações
- Preferências de aparência
- Estatísticas do usuário
- Opções de sair e excluir conta

## 🎨 Design

- **Tema Escuro** completo (#0a1929)
- **Material-UI** com componentes modernos
- **Sidebar responsiva** com 7 itens de menu
- **Cards coloridos** com ícones e progresso visual
- **Gráficos interativos** (Recharts)
- **Alertas e notificações** personalizados

## 🔌 Integração com Backend

Todas as funcionalidades estão conectadas com o Supabase:

- **Autenticação**: JWT com refresh token
- **Metas**: CRUD completo + atualização automática
- **Questões**: Persistência com cálculo de estatísticas
- **Analytics**: Agregação de dados por matéria
- **Relatórios**: Filtros por mês/ano

## 🚀 Como Usar

### 1. Criar Conta/Login

Acesse http://localhost:5174 e:

- Crie uma nova conta ou faça login
- Será redirecionado para o dashboard

### 2. Criar Meta Semanal

- Vá em "Metas" no menu
- Defina horas, matérias e questões desejadas
- Clique em "Criar Meta"

### 3. Adicionar Questões

- Vá em "Questões" no menu
- Selecione a matéria
- Informe total de questões, acertos e erros
- Sua meta será atualizada automaticamente

### 4. Acompanhar Progresso

- **Dashboard**: Veja resumo da semana
- **Analytics**: Visualize gráficos e estatísticas
- **Relatórios**: Confira desempenho mensal
- **Plano Semanal**: Organize suas tarefas

### 5. Configurar Conta

- Vá em "Configurações"
- Edite perfil, senha e preferências

## 📊 Cálculo de Classificação

- **Ótimo**: ≥ 90% de acerto 🌟
- **Bom**: 75% - 89% de acerto 👍
- **Regular**: 60% - 74% de acerto 😐
- **Ruim**: < 60% de acerto 😔

## 🔄 Atualização Automática

Quando você adiciona questões:

1. O sistema registra no banco
2. Calcula a acurácia automaticamente
3. Atualiza a meta semanal atual
4. Recalcula o progresso total (média de horas, questões e matérias)

## 🎯 Progresso de Metas

A meta é calculada pela média de 3 fatores:

- **Horas**: (horas_atuais / horas_meta) × 100
- **Questões**: (questões_atuais / questões_meta) × 100
- **Matérias**: (matérias_atuais / matérias_meta) × 100

**Progresso Total** = (Horas + Questões + Matérias) / 3

## 💾 Persistência de Dados

- **Backend**: Supabase PostgreSQL
- **Frontend**: Zustand + localStorage
- **Cache**: React Query (futuro)

## 🌐 Tecnologias

**Frontend:**

- React 18 + TypeScript
- Material-UI (dark theme)
- Recharts (gráficos)
- Zustand (estado)
- React Router v6

**Backend:**

- Node.js + Express
- Prisma ORM
- PostgreSQL (Supabase)
- JWT Authentication

## 📱 Responsivo

Todas as páginas são totalmente responsivas:

- Desktop: Layout completo com sidebar
- Tablet: Adaptação de grid e cards
- Mobile: Menu hamburger e layout vertical

## 🔐 Segurança

- Senhas com bcrypt
- Tokens JWT (7 dias)
- Refresh tokens (30 dias)
- Rotas protegidas
- Rate limiting

## 📈 Próximas Funcionalidades

- [ ] Notificações push
- [ ] Exportar relatórios em PDF
- [ ] Gráficos de evolução temporal
- [ ] Metas colaborativas
- [ ] Integração com calendário
- [ ] App Mobile (React Native)
- [ ] Gamificação e conquistas
- [ ] Modo de estudo (Pomodoro)

## 🐛 Suporte

Se encontrar algum problema:

1. Verifique o console do navegador (F12)
2. Verifique os logs do backend
3. Confirme que o Supabase está conectado
4. Limpe o cache e localStorage se necessário

---

**Desenvolvido com ❤️ usando React + TypeScript + Material-UI**
