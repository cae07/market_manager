# 🔒 Git Hooks - Validação de Commit

## 📋 **Sistema Implementado**

### **1. Validação Pre-Commit (Husky + Lint-staged)**
- ✅ **ESLint**: Verifica problemas de código antes do commit
- ✅ **Prettier**: Formata código automaticamente
- ✅ **Zero warnings**: Commits são rejeitados se houver warnings
- ✅ **Auto-fix**: Problemas simples são corrigidos automaticamente

### **2. Validação de Mensagem de Commit**
- ✅ **Formato obrigatório**: `tipo(escopo): descrição`
- ✅ **Tipos válidos**: feat, fix, docs, style, refactor, test, chore
- ✅ **Mensagens rejeitadas** se não seguirem o padrão

## 🚀 **Como Funciona**

### **Fluxo de Commit:**
```bash
git add arquivo.tsx
git commit -m "feat: nova funcionalidade"
```

**Processo automático:**
1. 🔍 **Lint-staged** roda ESLint e Prettier nos arquivos staged
2. ❌ **Se houver erros/warnings**: Commit é rejeitado
3. ✅ **Se estiver limpo**: Valida mensagem do commit
4. ❌ **Mensagem inválida**: Commit é rejeitado
5. ✅ **Tudo OK**: Commit é aceito

### **Exemplo de Rejeição por Lint:**
```bash
$ git commit -m "feat: novo componente"

✖ npx eslint --max-warnings 0:
src/Component.tsx
  5:3  warning  Unexpected console statement  no-console
✖ 1 problem (0 errors, 1 warning)
ESLint found too many warnings (maximum: 0).
```

### **Exemplo de Rejeição por Mensagem:**
```bash
$ git commit -m "adicionando arquivo"

❌ Mensagem de commit inválida!

📋 Formato esperado:
   tipo(escopo): descrição
```

## 📝 **Tipos de Commit Válidos**

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat: adicionar tela de gastos` |
| `fix` | Correção de bug | `fix(header): corrigir responsividade` |
| `docs` | Documentação | `docs: atualizar README` |
| `style` | Formatação sem mudança de lógica | `style: ajustar indentação` |
| `refactor` | Refatoração de código | `refactor: simplificar componente` |
| `test` | Testes | `test: adicionar testes unitários` |
| `chore` | Tarefas de manutenção | `chore: atualizar dependências` |

## ⚙️ **Configurações**

### **Arquivos de configuração:**
- **`.husky/pre-commit`** - Hook de pre-commit
- **`.husky/commit-msg`** - Validação de mensagem
- **`package.json`** - Configuração do lint-staged

### **Scripts disponíveis:**
```bash
npm run lint         # Verificar problemas
npm run lint:fix     # Corrigir automaticamente
npm run lint:check   # Verificar sem tolerância a warnings
npm run pre-commit   # Executar lint-staged manualmente
```

## 🛠️ **Comandos Úteis**

### **Testar validação manualmente:**
```bash
npx lint-staged                    # Testa pre-commit hook
```

### **Se precisar pular validação (emergência):**
```bash
git commit --no-verify -m "fix: correção urgente"
```

### **Ver arquivos que serão validados:**
```bash
git diff --cached --name-only
```

## 📊 **Benefícios**

- ✅ **Qualidade de código** garantida em todos os commits
- ✅ **Padrão de mensagens** para melhor histórico git
- ✅ **Auto-formatação** elimina discussões de estilo
- ✅ **Previne bugs** antes de chegarem ao repositório
- ✅ **Histórico limpo** com mensagens padronizadas

## 🚨 **Troubleshooting**

### **Hook não executa:**
```bash
npx husky install
```

### **Lint-staged falha:**
```bash
npm run lint:fix
git add .
git commit -m "fix: corrigir problemas de lint"
```

### **Reinstalar hooks:**
```bash
rm -rf .husky
npx husky init
```

---

✨ **Sistema configurado em:** ${new Date().toLocaleDateString('pt-BR')}
🔧 **Desenvolvido para:** App Gastos (React + TypeScript)