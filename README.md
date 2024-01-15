# ⚡ Energy - Dashboard

## Link do projeto em produção:
#### https://energy-dashboard-two.vercel.app

## 👀 Observação
### O arquivo db.json foi movido para um repo separado, para simplificar o deploy do server:
https://github.com/fugisakimatheus/energy-dashboard-api

## 🚀 Executando o projeto

### 1° - Instalando as dependências:
```bash
npm install
```

### 2° - Iniciando o projeto:
```bash
npm run dev
```

## 🧪 Executando testes

### Testes E2E com Playwright:
#### **Caso esteja utilizando o Playwright pela a 1° vez, execute o comando abaixo para instalar as dependências do Playwright:**
```bash
npx playwright install-deps
```

&nbsp;

```bash
# Execução padrão dos testes do Playwright
npm run test:e2e
```

```bash
# Execução do Playwright no modo interface gráfica
npm run test:e2e-ui
```

### Testes unitários com Jest:
```bash
# Execução padrão do jest
npm run test
```

```bash
# Observa arquivo ser salvo e roda o teste novamente
npm run test:watch "path-do-arquivo"
```

```bash
# Abre o coverage dos testes unitários do Jest
npm run open:jest-coverage
```

## 📑 Outros scripts

### Realiza build para produção:
```bash
npm run build
```

### Executa o preview do build de produção:
```bash
npm run start
```

### Corrige todos os problemas solucionáveis do eslint:
```bash
npm run fix:lint
```

### Aplica formatação do estilo de código do prettier:
```bash
npm run prettify
```

&nbsp;

## 📚 Referências
#### 1. https://nextjs.org
#### 2. https://tailwindcss.com
#### 3. https://recharts.org/en-US
#### 4. https://docs.pmnd.rs/zustand/getting-started/introduction
#### 5. https://nextui.org
#### 6. https://vercel.com

&nbsp;

## 🧩 Extensões recomendadas:

  - #### ESLint (<https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>)
  
  - #### Prettier (<https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>)
  
  - #### Tailwind CSS IntelliSense (<https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss>)
