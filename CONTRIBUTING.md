# 🤝 GUIA DE CONTRIBUIÇÃO

Obrigado por seu interesse em contribuir com o **App de Controle de Estudos**!

---

## 📋 Índice

- [Como Contribuir](#-como-contribuir)
- [Reportar Bugs](#-reportar-bugs)
- [Sugerir Funcionalidades](#-sugerir-funcionalidades)
- [Pull Requests](#-pull-requests)
- [Padrões de Código](#-padrões-de-código)
- [Commits](#-commits)
- [Testes](#-testes)

---

## 🚀 Como Contribuir

### 1. Fork o Projeto

```bash
# Clique em "Fork" no GitHub ou:
gh repo fork seu-usuario/estudos-app
```

### 2. Clone seu Fork

```bash
git clone https://github.com/SEU-USUARIO/estudos-app.git
cd estudos-app
```

### 3. Configure o Upstream

```bash
git remote add upstream https://github.com/ORIGINAL-USUARIO/estudos-app.git
```

### 4. Crie uma Branch

```bash
git checkout -b feature/minha-nova-funcionalidade
# ou
git checkout -b fix/correcao-de-bug
```

### 5. Faça suas Mudanças

```bash
# Faça as alterações necessárias
# Teste localmente
npm run dev
```

### 6. Commit suas Mudanças

```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
```

### 7. Push para seu Fork

```bash
git push origin feature/minha-nova-funcionalidade
```

### 8. Abra um Pull Request

- Vá para o repositório original no GitHub
- Clique em "New Pull Request"
- Selecione sua branch
- Preencha o template de PR

---

## 🐛 Reportar Bugs

### Antes de Reportar

- ✅ Verifique se o bug já foi reportado
- ✅ Teste na última versão
- ✅ Colete informações do sistema

### Template de Bug Report

```markdown
**Descrição do Bug**
Uma descrição clara do que aconteceu.

**Como Reproduzir**

1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**

- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Versão: [e.g. 1.0.0]

**Informações Adicionais**
Qualquer contexto adicional.
```

---

## 💡 Sugerir Funcionalidades

### Template de Feature Request

```markdown
**Sua sugestão está relacionada a um problema?**
Descrição clara do problema.

**Descreva a solução que você gostaria**
Descrição clara da solução proposta.

**Descreva alternativas consideradas**
Outras soluções ou funcionalidades consideradas.

**Contexto Adicional**
Screenshots, mockups, referências, etc.
```

---

## 🔀 Pull Requests

### Checklist

Antes de abrir um PR, certifique-se de que:

- [ ] Código segue os padrões do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Todos os testes estão passando
- [ ] Documentação foi atualizada
- [ ] Não há conflitos com a branch main
- [ ] Commit messages seguem o padrão
- [ ] Build está funcionando

### Template de Pull Request

```markdown
## Descrição

Breve descrição das mudanças.

## Tipo de Mudança

- [ ] Bug fix (mudança que corrige um problema)
- [ ] Nova funcionalidade (mudança que adiciona funcionalidade)
- [ ] Breaking change (mudança que quebra compatibilidade)
- [ ] Documentação (mudança apenas na documentação)

## Como Testar

1. Passo 1
2. Passo 2
3. Verificar X

## Checklist

- [ ] Código segue os padrões
- [ ] Testes adicionados
- [ ] Documentação atualizada
- [ ] Build passando

## Screenshots (se aplicável)

Adicione screenshots das mudanças visuais.

## Issues Relacionadas

Closes #123
```

---

## 📝 Padrões de Código

### TypeScript

```typescript
// ✅ BOM
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User {
  // ...
}

// ❌ EVITAR
function getUser(id) {
  // ...
}
```

### React Components

```tsx
// ✅ BOM
import React from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
  subtitle?: string;
}

export const MyComponent: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      {subtitle && <Typography variant="subtitle1">{subtitle}</Typography>}
    </Box>
  );
};

// ❌ EVITAR
export function MyComponent(props) {
  return <div>{props.title}</div>;
}
```

### Backend (Express)

```typescript
// ✅ BOM
import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/error.middleware";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await userService.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return res.json(user);
  } catch (error) {
    next(error);
  }
};

// ❌ EVITAR
export const getUser = (req, res) => {
  // sem tipos, sem error handling
  const user = userService.findById(req.params.id);
  res.json(user);
};
```

### Naming Conventions

| Tipo             | Convenção  | Exemplo                                 |
| ---------------- | ---------- | --------------------------------------- |
| Variáveis        | camelCase  | `userName`, `isActive`                  |
| Funções          | camelCase  | `getUserById`, `calculateTotal`         |
| Componentes      | PascalCase | `UserCard`, `LoginForm`                 |
| Interfaces/Types | PascalCase | `User`, `ApiResponse`                   |
| Constants        | UPPER_CASE | `API_URL`, `MAX_RETRIES`                |
| Arquivos         | kebab-case | `user-service.ts`, `auth-middleware.ts` |

---

## 💬 Commits

### Conventional Commits

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos de Commit

| Tipo       | Descrição                        |
| ---------- | -------------------------------- |
| `feat`     | Nova funcionalidade              |
| `fix`      | Correção de bug                  |
| `docs`     | Documentação                     |
| `style`    | Formatação, ponto e vírgula, etc |
| `refactor` | Refatoração de código            |
| `test`     | Adição ou correção de testes     |
| `chore`    | Tarefas de build, configs, etc   |
| `perf`     | Melhorias de performance         |

### Exemplos

```bash
# Funcionalidade
git commit -m "feat(goals): adiciona criação de metas semanais"

# Bug fix
git commit -m "fix(analytics): corrige cálculo de progresso"

# Documentação
git commit -m "docs: atualiza README com instruções de instalação"

# Refatoração
git commit -m "refactor(auth): melhora lógica de autenticação"

# Testes
git commit -m "test(goals): adiciona testes para criação de metas"

# Breaking change
git commit -m "feat(api): muda estrutura de resposta da API

BREAKING CHANGE: A resposta da API agora retorna {data, meta}"
```

---

## 🧪 Testes

### Escrever Testes

```typescript
// ✅ BOM
describe("Goal Service", () => {
  describe("createGoal", () => {
    it("should create a goal with valid data", async () => {
      const goalData = {
        targetHours: 20,
        targetSubjects: 8,
        targetQuestions: 100,
      };

      const goal = await goalService.create(goalData);

      expect(goal).toBeDefined();
      expect(goal.targetHours).toBe(20);
    });

    it("should throw error with invalid data", async () => {
      const goalData = {
        targetHours: -5, // inválido
      };

      await expect(goalService.create(goalData)).rejects.toThrow(
        "Invalid target hours"
      );
    });
  });
});
```

### Rodar Testes

```bash
# Todos os testes
npm test

# Testes com coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Específico
npm test -- goal.service.test.ts
```

---

## 📚 Documentação

### Comentários no Código

```typescript
/**
 * Calcula o progresso de uma meta
 * @param current - Valor atual
 * @param target - Valor alvo
 * @returns Progresso em porcentagem (0-100)
 * @example
 * calculateProgress(50, 100) // returns 50
 */
export function calculateProgress(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
}
```

### README de Componentes

```markdown
# GoalCard Component

Componente para exibir uma meta semanal.

## Props

| Prop     | Type       | Required | Default | Description         |
| -------- | ---------- | -------- | ------- | ------------------- |
| goal     | Goal       | Yes      | -       | Objeto da meta      |
| onEdit   | () => void | No       | -       | Callback ao editar  |
| onDelete | () => void | No       | -       | Callback ao deletar |

## Example

\`\`\`tsx
<GoalCard
goal={myGoal}
onEdit={() => handleEdit()}
onDelete={() => handleDelete()}
/>
\`\`\`
```

---

## 🔍 Code Review

### Checklist do Reviewer

- [ ] Código é legível e bem estruturado
- [ ] Lógica está correta
- [ ] Testes cobrem casos principais
- [ ] Documentação está atualizada
- [ ] Não há código duplicado
- [ ] Não há vulnerabilidades de segurança
- [ ] Performance é adequada
- [ ] Segue padrões do projeto

### Como Dar Feedback

**✅ BOM:**

```
Sugestão: Poderia extrair essa lógica para uma função separada?
```

**❌ EVITAR:**

```
Isso está errado, refaça tudo.
```

---

## 🎯 Boas Práticas

### DRY (Don't Repeat Yourself)

```typescript
// ✅ BOM
const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValid1 = validateEmail(email1);
const isValid2 = validateEmail(email2);

// ❌ EVITAR
const isValid1 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email1);
const isValid2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email2);
```

### SOLID Principles

```typescript
// ✅ Single Responsibility
class UserService {
  async create(data: CreateUserDTO) {
    /* ... */
  }
  async findById(id: string) {
    /* ... */
  }
}

class EmailService {
  async send(to: string, subject: string) {
    /* ... */
  }
}

// ❌ Muitas responsabilidades
class UserService {
  async create(data: CreateUserDTO) {
    /* ... */
  }
  async sendEmail(to: string) {
    /* ... */
  }
  async uploadFile(file: File) {
    /* ... */
  }
}
```

### Error Handling

```typescript
// ✅ BOM
try {
  const user = await userService.findById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
} catch (error) {
  if (error instanceof AppError) {
    throw error;
  }
  throw new AppError("Internal server error", 500);
}

// ❌ EVITAR
const user = await userService.findById(id);
return user; // não trata erro
```

---

## 📞 Dúvidas?

- 💬 Abra uma [Discussion](https://github.com/seu-usuario/estudos-app/discussions)
- 🐛 Reporte um [Bug](https://github.com/seu-usuario/estudos-app/issues/new?template=bug_report.md)
- 💡 Sugira uma [Feature](https://github.com/seu-usuario/estudos-app/issues/new?template=feature_request.md)

---

## 🙏 Agradecimentos

Obrigado por contribuir com o projeto!

Toda contribuição, por menor que seja, é valiosa e ajuda a melhorar o app para todos.

---

## 📜 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a Licença MIT.

---

**Happy Coding! 🚀**

_Última atualização: 13 de Janeiro de 2026_
