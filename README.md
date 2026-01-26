# 🚀 VControla - Frontend

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

> **Status do Projeto:** ✅ MVP em Produção | 🏗️ Desenvolvimento Contínuo

O **VControla Frontend** é a interface visual do ecossistema VControla. Uma aplicação **Single Page Application (SPA)** robusta, desenvolvida para simplificar a gestão financeira pessoal, oferecendo controle total sobre contas, transações e cartões de crédito com uma experiência de usuário (UX) fluida e intuitiva.

---

## 🌐 Demonstração Online

**🚀 Acesse o VControla em produção:** [https://vcontrola.vercel.app/auth/login](https://vcontrola.vercel.app/auth/login)

A aplicação está disponível para testes! Você pode criar uma conta e explorar todas as funcionalidades implementadas.

> **Deploy Automático:** Configurado via Vercel com CI/CD integrado ao repositório.

---

## 📸 Screenshots

<img width="860" height="614" alt="Login" src="https://github.com/user-attachments/assets/d25e6655-52b0-4460-9f99-a64d858f30c2" />
<img width="572" height="641" alt="Cadastrese" src="https://github.com/user-attachments/assets/32757585-3819-4a9c-8c25-e66b000ffb85" />

<img width="1911" height="911" alt="DashBoardVC" src="https://github.com/user-attachments/assets/a230f4a0-a3f8-42b1-9384-35c5a8bb060a" />
<img width="1909" height="905" alt="Transacoes" src="https://github.com/user-attachments/assets/05664b39-419c-43c3-852e-5a722a572037" />

---

## 🎯 Funcionalidades Principais

### 💰 Gestão de Transações (CRUD Completo)

- **Listagem Inteligente:** Tabela interativa com paginação (server-side ou client-side).
- **Filtros Dinâmicos:** Filtragem instantânea por Conta Bancária e Busca textual (Descrição/Valor).
- **Operações:** Criação, Edição e Exclusão de receitas e despesas com atualização em tempo real do saldo.
- **Feedback Visual:** Indicadores de status e modais de confirmação para ações críticas (estorno automático ao excluir).

### 📊 Dashboard Financeiro

- Visualização de resumo mensal com receitas, despesas e saldo.
- Listagem de contas bancárias com saldos atualizados.
- Saudação personalizada baseada no horário.

### 💳 Controle de Contas e Cartões

- Gerenciamento completo de contas bancárias (CRUD).
- Sistema de tipos de conta personalizáveis.
- Associação de contas a categorias específicas.

### 📋 Planejamento Financeiro

- Gestão de carteiras financeiras (Reserva de Emergência, Casa, Viagem, etc.).
- Controle de saldo real vs. saldo previsto por carteira.
- Operações de adicionar saldo, registrar gastos e resgatar valores.
- Paginação e organização de itens de planejamento.

---

## 🏗️ Arquitetura e Decisões Técnicas

Diferente da abordagem simplificada (_Standalone Components_), este projeto adota uma arquitetura baseada em **NgModules** para garantir organização empresarial, escalabilidade e clara separação de responsabilidades.

A estrutura é dividida em:

- **CoreModule:** O "coração" da aplicação. Contém serviços globais (Singletons), Interceptors (Auth, Error Handling) e Guards de rota. Carregado apenas uma vez no `AppModule`.
- **SharedModule:** Componentes visuais reutilizáveis (botões, inputs, cards), Pipes e Diretivas. Importado pelos módulos de funcionalidade.
- **Feature Modules:** Módulos de negócio (Dashboard, Transações, Contas) carregados sob demanda via **Lazy Loading**, otimizando o tempo de carregamento inicial da aplicação.

### 🔌 Integração com Backend

A comunicação é feita via `HttpClient` consumindo a API REST Spring Boot.

- **Interceptors:** Injeção automática de Token JWT e tratamento global de erros HTTP.
- **Models:** Interfaces TypeScript estritas espelhando as entidades JPA para garantir tipagem forte.

---

## 🛠️ Stack Tecnológica

- **Framework:** Angular 17+
- **Linguagem:** TypeScript
- **Estilização:** SCSS (Sass) com arquitetura BEM/Modular.
- **UI Components:** Angular Material (Customizado).
- **Reatividade:** RxJS (Observables, Subjects e Operators).
- **Gerenciamento de Estado:** Baseado em Services (BehaviorSubject).

---

## 📂 Estrutura de Pastas

```text
src/
├── app/
│   ├── core/           # Serviços singleton, interceptors, guards, models globais
│   ├── shared/         # Componentes UI reutilizáveis (botões, inputs)
│   ├── features/       # Módulos de negócio (Lazy Loaded)
│   │   ├── dashboard/
│   │   ├── transacoes/
│   │   │   ├── components/  # Modais e componentes específicos
│   │   │   ├── pages/       # Páginas de rota (Lista)
│   │   │   └── transacoes.module.ts
│   │   └── contas/
│   ├── app.module.ts
│   └── app-routing.module.ts
├── assets/
└── environments/

🛣️ Roadmap e Próximos Passos

### ✅ Concluído
- [x] Arquitetura Base (Core/Shared/Features)
- [x] Sistema de Autenticação (Login/Cadastro)
- [x] CRUD de Contas Bancárias
- [x] CRUD de Tipos de Conta
- [x] CRUD de Transações com Estorno Automático
- [x] Filtros e Paginação no Frontend
- [x] Dashboard com Resumo Financeiro
- [x] Sistema de Planejamento Financeiro (Carteiras)
- [x] Deploy Automático (Vercel)

### 🚧 Em Desenvolvimento
- [ ] Dashboard com Gráficos Avançados (Chart.js ou Ngx-Charts)
- [ ] Gestão de Faturas de Cartão de Crédito
- [ ] Relatórios e Exportação de Dados
- [ ] Modo Escuro (Dark Mode)
- [ ] Notificações e Alertas de Gastos
```
