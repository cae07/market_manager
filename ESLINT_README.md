# ESLint Configuration - App Gastos

## 📋 **Configurações Implementadas**

### **1. ESLint para Padrão de Código**

- ✅ Configuração para React 18 + TypeScript
- ✅ Regras de formatação (2 espaços, aspas simples, etc.)
- ✅ Validação de hooks do React
- ✅ Ordenação automática de imports
- ✅ Compatível com react-scripts 5.0.1

### **2. Scripts Disponíveis**

```bash
npm run lint         # Verifica problemas no código
npm run lint:fix     # Corrige automaticamente problemas
npm run lint:check   # Verifica sem tolerância a warnings
```

### **3. Configuração VS Code**

- ✅ Auto-correção ao salvar
- ✅ Formatação automática com Prettier + ESLint
- ✅ Validação em tempo real
- ✅ Indentação padrão de 2 espaços

## 🔧 **Regras Principais**

### **Formatação:**

- **Indentação:** 2 espaços
- **Aspas:** Simples ('string')
- **Ponto e vírgula:** Obrigatório
- **Trailing comma:** Em objetos/arrays multi-linha
- **Espaçamento:** Dentro de objetos { key: value }

### **React:**

- **JSX:** Indentação de 2 espaços
- **Hooks:** Validação de regras e dependências
- **Props:** Indentação alinhada

### **Imports:**

- **Ordem:** builtin → external → internal → parent → sibling → index
- **Alfabética:** Ordenação automática
- **Linhas em branco:** Entre grupos de imports

## 📁 **Arquivos de Configuração**

- **`.eslintrc.js`** - Configuração principal do ESLint
- **`.eslintignore`** - Arquivos ignorados pelo ESLint
- **`.prettierrc`** - Configuração do Prettier
- **`.vscode/settings.json`** - Configurações do VS Code
- **`.editorconfig`** - Padrões do editor

## 🚀 **Como Usar**

### **Verificar código:**

```bash
npm run lint
```

### **Corrigir automaticamente:**

```bash
npm run lint:fix
```

### **No VS Code:**

- **Salvar arquivo:** Auto-correção automática
- **Problemas:** Aparecem sublinhados em vermelho
- **Quick Fix:** Ctrl+. ou Cmd+.

## ⚙️ **Compatibilidade**

- ✅ React 18.3.1
- ✅ TypeScript 4.9.5
- ✅ react-scripts 5.0.1
- ✅ Node.js 16+
- ✅ VS Code com extensão ESLint

## 🔄 **Fluxo de Desenvolvimento**

1. **Escrever código** normalmente
2. **Salvar arquivo** → Auto-correção automática
3. **Verificar problemas** com `npm run lint`
4. **Corrigir manualmente** problemas que não podem ser auto-corrigidos

## 📝 **Extensões VS Code Recomendadas**

- **ESLint** (dbaeumer.vscode-eslint)
- **Prettier** (esbenp.prettier-vscode)
- **Auto Rename Tag** (formulahendry.auto-rename-tag)

---

✨ **Configuração realizada em:** ${new Date().toLocaleDateString('pt-BR')}
