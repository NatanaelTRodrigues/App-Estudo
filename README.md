# 🎓 App de Controle Total de Estudos

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

Sistema completo de gestão e controle de estudos com suporte para **Mobile** e **Web**, permitindo acompanhamento total do progresso, metas, questões e análises de desempenho.

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Documentação](#-documentação)
- [Contribuição](#-contribuição)

---

## 🎯 Visão Geral

O **App de Controle de Estudos** foi desenvolvido para estudantes que desejam ter controle total sobre seus estudos, com funcionalidades como:

- ✅ **Metas Semanais**: Defina e acompanhe metas de horas, matérias e questões
- 📝 **Controle de Questões**: Registre questões feitas, acertos e erros por matéria
- 📊 **Análises Visuais**: Gráficos automáticos de desempenho e evolução
- 📅 **Plano Semanal Fixo**: Visualização clara do plano de estudos
- 📈 **Relatórios Mensais**: Relatórios automáticos com classificação de desempenho
- 🔔 **Notificações**: Lembretes de estudos, metas e simulados
- 📱 **Mobile + Web**: Funciona perfeitamente em todas as plataformas

---

## ✨ Funcionalidades

### 🎯 Sistema de Metas

- Crie metas semanais (horas, matérias, questões)
- Acompanhe progresso em tempo real
- Compare com semanas anteriores
- Classificação automática de desempenho

### 📝 Controle de Questões

- Registre questões por matéria
- Acompanhe acertos vs erros
- Visualize taxa de acerto por matéria
- Histórico completo de questões

### 📊 Análises e Gráficos

- Gráfico de evolução semanal
- Desempenho por matéria
- Comparação entre períodos
- Classificação: ❌ Ruim / ⚠️ Regular / ✅ Bom / ⭐ Ótimo

### 📅 Plano Semanal

- Visualização do plano fixo de estudos
- Integração com calendário do dispositivo
- Marcação de tarefas concluídas
- Lembretes automáticos

### 📈 Relatórios Mensais

- Geração automática ao final do mês
- Estatísticas completas
- Melhor e pior semana
- Exportação em PDF/CSV

### 🔔 Notificações

- Lembretes de início de estudos
- Alertas de metas semanais
- Notificações de simulados
- Lembretes de revisão

---

## 🛠 Tecnologias

### Backend

- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados
- **Redis** - Cache
- **JWT** - Autenticação
- **Firebase** - Notificações push
- **Google Calendar API** - Integração de calendário

### Frontend Web

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Material-UI (MUI)** - Componentes UI
- **Zustand** - Gerenciamento de estado
- **Recharts** - Gráficos
- **React Router** - Roteamento
- **Axios** - Requisições HTTP
- **PWA** - Progressive Web App

### Mobile

- **React Native** + **Expo**
- **TypeScript**
- **React Navigation** - Navegação
- **React Native Paper** - UI Components
- **Victory Native** - Gráficos
- **Expo Notifications** - Notificações

---

## 📂 Estrutura do Projeto

```
estudos-app/
├── backend/              # Backend Node.js + TypeScript
│   ├── src/
│   │   ├── controllers/  # Controladores da API
│   │   ├── models/       # Modelos de dados
│   │   ├── services/     # Lógica de negócio
│   │   ├── middlewares/  # Middlewares
│   │   ├── routes/       # Rotas da API
│   │   └── utils/        # Utilitários
│   └── prisma/           # Schema e migrations
│
├── web/                  # Frontend Web React
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── services/     # Serviços (API)
│   │   ├── store/        # Estado global
│   │   └── types/        # TypeScript types
│
└── mobile/               # App Mobile React Native
    └── src/
        ├── screens/      # Telas do app
        ├── components/   # Componentes
        └── navigation/   # Navegação
```

---

## 🚀 Instalação

### Pré-requisitos

- **Node.js** 18+ ([Download](https://nodejs.org))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **Redis** (opcional) ([Download](https://redis.io/download))
- **Git** ([Download](https://git-scm.com/))

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/estudos-app.git
cd estudos-app
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
copy .env.example .env

# Editar .env com suas configurações
# DATABASE_URL, JWT_SECRET, etc.

# Executar migrations
npm run prisma:migrate

# Gerar Prisma Client
npm run prisma:generate

# Iniciar servidor
npm run dev
```

O backend estará rodando em `http://localhost:3000`

### 3. Configurar Frontend Web

```bash
cd ../web

# Instalar dependências
npm install

# Criar arquivo .env
echo VITE_API_URL=http://localhost:3000/api > .env

# Iniciar aplicação
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

### 4. Configurar Mobile (Opcional)

```bash
cd ../mobile

# Instalar dependências
npm install

# Iniciar Expo
npm start
```

---

## 💻 Uso

### Primeiro Acesso

1. Acesse `http://localhost:5173`
2. Clique em "Criar Conta"
3. Preencha seus dados
4. Configure seu plano semanal
5. Defina sua primeira meta

### Fluxo Diário

1. **Dashboard**: Visualize seu progresso
2. **Registrar Estudo**: Marque sessões concluídas
3. **Registrar Questões**: Adicione questões resolvidas
4. **Acompanhar Análises**: Veja gráficos de desempenho

### Funcionalidades Principais

#### Criar Meta Semanal

```
Metas → Nova Meta
- Defina horas de estudo
- Quantidade de matérias
- Quantidade de questões
```

#### Registrar Questões

```
Questões → Nova Entrada
- Selecione matéria
- Informe total de questões
- Informe acertos e erros
```

#### Visualizar Relatório

```
Relatórios → Relatório Mensal
- Estatísticas completas
- Classificação de desempenho
- Exportar PDF/CSV
```

---

## 📊 Exemplos de Gráficos

### Evolução Semanal

![Gráfico de Evolução](docs/images/grafico-evolucao.png)

### Desempenho por Matéria

![Gráfico de Matérias](docs/images/grafico-materias.png)

### Dashboard Completo

![Dashboard](docs/images/dashboard.png)

---

## 📖 Documentação

Para documentação completa, consulte:

- [Arquitetura](ARQUITETURA.md) - Arquitetura técnica completa
- [API Docs](docs/API.md) - Documentação da API REST
- [Guia de Contribuição](CONTRIBUTING.md) - Como contribuir
- [Changelog](CHANGELOG.md) - Histórico de versões

---

## 🧪 Testes

```bash
# Backend
cd backend
npm test

# Frontend
cd web
npm test
```

---

## 🚢 Deploy

### Backend (Heroku)

```bash
heroku create estudos-app-backend
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

### Frontend (Vercel)

```bash
cd web
vercel deploy --prod
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Veja o [guia de contribuição](CONTRIBUTING.md).

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Natanael Rodrigues**

- GitHub: [@natanael](https://github.com/natanael)
- Email: natanael.rodrigues@email.com

---

## 🙏 Agradecimentos

- Comunidade React
- Comunidade Node.js
- Contribuidores do projeto

---

## 📞 Suporte

Se você tiver alguma dúvida ou problema, abra uma [issue](https://github.com/seu-usuario/estudos-app/issues) no GitHub.

---

## 🗺️ Roadmap

- [x] Fase 1: MVP básico
- [x] Fase 2: Análises e gráficos
- [x] Fase 3: Integrações (notificações, calendário)
- [ ] Fase 4: App mobile completo
- [ ] Fase 5: Recursos extras (exportação, PWA)
- [ ] Fase 6: IA para recomendações personalizadas
- [ ] Fase 7: Modo colaborativo (grupos de estudo)

---

**⭐ Se este projeto te ajudou, não esqueça de dar uma estrela!**
