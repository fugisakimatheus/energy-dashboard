# Energy Dashboard

Dashboard web para visualização de medições de energia com dados da CCEE (2021–2022). Interface em tema escuro por padrão, com alternância para modo claro, gráficos interativos, tabela paginada e filtros por data.

**Produção:** https://energy-dashboard-two.vercel.app

## Funcionalidades

- **Consumo anual** — comparativo mensal entre 2021 e 2022 (gráfico de barras)
- **Medição horária** — consumo por dia com filtro de data e navegação entre dias
- **Medição histórica** — última semana de dezembro/2022 (gráfico de área)
- **Tabela de medições** — paginação, ordenação e filtro por intervalo de datas
- **Tema claro/escuro** — persistido via `next-themes` (padrão: escuro)
- **Formatação pt-BR** — valores de energia com 3 casas decimais (ex.: `104,859 MWh`)

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | [Next.js 14](https://nextjs.org) (App Router) |
| UI | [React 18](https://react.dev), [Tailwind CSS](https://tailwindcss.com), [NextUI](https://nextui.org) |
| Gráficos | [Recharts](https://recharts.org) |
| Estado (client) | [Zustand](https://docs.pmnd.rs/zustand) |
| Tema | [next-themes](https://github.com/pacocoursey/next-themes) |
| Datas | [react-datepicker](https://reactdatepicker.com), [date-fns](https://date-fns.org) |
| Testes | [Jest](https://jestjs.io), [Testing Library](https://testing-library.com), [Playwright](https://playwright.dev) |
| Deploy | [Vercel](https://vercel.com) |

## Arquitetura

### Visão geral

```
┌─────────────────────────────────────────────────────────────┐
│  Browser                                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  /dashboard (Server + Client Components)              │  │
│  │  ├─ Gráficos server (Suspense) → MeasurementService   │  │
│  │  ├─ Gráfico horário + Tabela (client) → Zustand store   │  │
│  │  └─ Providers: next-themes + NextUI                   │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS (timeout 20s)
                               ▼
              https://energy-dashboard-api.vercel.app
              (JSON Server — repo separado)
```

A rota `/` redireciona permanentemente para `/dashboard` (`next.config.js`).

### Estrutura de pastas

```
src/
├── app/                    # App Router (layout, providers, estilos globais)
│   ├── dashboard/page.tsx  # Página principal do dashboard
│   ├── globals.css         # Tokens CSS, tema, utilitários (glass-card, skeleton)
│   ├── layout.tsx
│   └── providers.tsx       # ThemeProvider + NextUIProvider
│
├── components/
│   ├── dump-components/    # Componentes presentacionais reutilizáveis
│   │   ├── card/
│   │   ├── chart-container/
│   │   ├── chart-loading/
│   │   ├── date-range-picker/
│   │   ├── single-date-picker/
│   │   ├── error-box/
│   │   ├── no-data-box/
│   │   └── select/
│   │
│   ├── wired-components/   # Componentes com lógica e integração de dados
│   │   └── dashboard/
│   │       ├── charts/     # anual, horário, histórico (+ loading/error/no-data)
│   │       └── measurements-table/
│   │
│   ├── dashboard-header.tsx
│   └── theme-toggle.tsx
│
├── data/
│   ├── models/measurement/ # Tipos e contratos da API
│   └── services/           # HTTPService, MeasurementService
│
├── store/
│   └── measurement-store.ts  # Estado client: gráfico horário + tabela
│
├── hooks/
│   └── use-chart-theme.ts    # Cores dos gráficos por tema
│
├── utils/                    # date, number, measurement, chart
└── e2e-tests/                # Playwright
```

### Padrão de componentes

- **dump-components** — UI sem acoplamento à API (Card, ErrorBox, date pickers, skeletons).
- **wired-components** — Orquestram fetch, store e estados (`loading` | `success` | `error` | vazio).

### Fluxo de dados

**Server Components** (gráficos anual e histórico):

1. `page.tsx` renderiza com `Suspense` e fallback de skeleton.
2. O componente chama `MeasurementService.search()` no servidor.
3. Em erro, exibe `ErrorBox`; sem dados, `NoDataBox`; caso contrário, passa dados ao wrapper Recharts (client).

**Client Components** (gráfico horário e tabela):

1. `useMeasurementStore` (Zustand) dispara requisições via `MeasurementService`.
2. Controle de corrida com IDs de requisição — respostas antigas são ignoradas.
3. Tabela usa `searchPaginated` com header `X-Total-Count` (10 itens por página).
4. Gráfico horário filtra por `day`, `month` e `year` na API.

**Camada HTTP** (`HTTPService`):

- Base URL: `https://energy-dashboard-api.vercel.app`
- Timeout de 20 segundos
- Suporte a `X-Total-Count` para paginação
- Cache configurável (`no-store` nos fetches críticos do client)

### Temas e estilos

- Variáveis CSS em `globals.css` (`--background`, `--card`, `--accent`, etc.).
- Classe `dark` no `<html>` via `next-themes`.
- Fundo em largura total no `html`; conteúdo limitado a 1440px em `.page-shell`.
- Cards com efeito glass (`glass-card`) e skeleton por opacidade (`skeleton-pulse`).

### Formatação numérica

Utilitários em `src/utils/number.ts`:

- `formatEnergyValue` — número com 3 decimais (pt-BR)
- `formatEnergy` — valor + unidade `MWh`
- Aplicado em tabela, tooltips e eixos dos gráficos

## API externa

Os dados não ficam neste repositório. A API está em:

https://github.com/fugisakimatheus/energy-dashboard-api

Endpoints utilizados: `GET /measurements` com filtros (`year`, `month`, `day`, ranges `_gte`/`_lte`), paginação (`_page`, `_limit`) e ordenação (`_sort`, `_order`).

## Executando o projeto

### Pré-requisitos

- Node.js 18+
- npm

### Instalação e desenvolvimento

```bash
npm install
npm run dev
```

Acesse http://localhost:3000 (redireciona para `/dashboard`).

### Build de produção

```bash
npm run build
npm run start
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Preview do build |
| `npm run lint` | ESLint (Next.js) |
| `npm run fix:lint` | ESLint com auto-fix |
| `npm run prettify` | Prettier nos arquivos `src` |
| `npm run test` | Testes unitários (Jest) |
| `npm run test:watch` | Jest em modo watch |
| `npm run open:jest-coverage` | Abre relatório de coverage |
| `npm run test:e2e` | Testes E2E (Playwright) |
| `npm run test:e2e-ui` | Playwright com interface gráfica |

## Testes

### Unitários (Jest)

```bash
npm run test
```

```bash
npm run test:watch src/utils/__tests__/number.spec.ts
```

Cobertura de serviços HTTP, store, utilitários e componentes dump/wired.

### E2E (Playwright)

Na primeira execução, instale as dependências do browser:

```bash
npx playwright install-deps
```

```bash
npm run test:e2e
npm run test:e2e-ui
```

Os testes E2E cobrem redirect, gráficos, filtros, tema, tabela e paginação contra a API em produção.

## Extensões recomendadas (VS Code)

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Referências

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Zustand](https://docs.pmnd.rs/zustand)
- [NextUI](https://nextui.org)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Vercel](https://vercel.com)
