# 🚀 VControla - Frontend

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

> **Status do Projeto:** 🏗️ Em desenvolvimento ativo (Fase de MVP e Refinamento de UX)

O **VControla Frontend** é a interface visual do ecossistema VControla. Uma aplicação **Single Page Application (SPA)** robusta, desenvolvida para simplificar a gestão financeira pessoal, oferecendo controle total sobre contas, transações e cartões de crédito com uma experiência de usuário (UX) fluida e intuitiva.

---

## 📸 Screenshots

<img width="1911" height="911" alt="DashBoardVC" src="https://github.com/user-attachments/assets/a230f4a0-a3f8-42b1-9384-35c5a8bb060a" />



---

## 🎯 Funcionalidades Principais

### 💰 Gestão de Transações (CRUD Completo)
- **Listagem Inteligente:** Tabela interativa com paginação (server-side ou client-side).
- **Filtros Dinâmicos:** Filtragem instantânea por Conta Bancária e Busca textual (Descrição/Valor).
- **Operações:** Criação, Edição e Exclusão de receitas e despesas com atualização em tempo real do saldo.
- **Feedback Visual:** Indicadores de status e modais de confirmação para ações críticas (estorno automático ao excluir).

### 📊 Dashboard Financeiro (Em breve)
- Visualização gráfica de receitas vs. despesas.
- Indicadores de saldo previsto vs. saldo real.

### 💳 Controle de Contas e Cartões
- Gerenciamento de múltiplas carteiras (ex: Reserva de Emergência, Casa, Viagem).
- Associação de contas bancárias a carteiras específicas.

---

## 🏗️ Arquitetura e Decisões Técnicas

Diferente da abordagem simplificada (*Standalone Components*), este projeto adota uma arquitetura baseada em **NgModules** para garantir organização empresarial, escalabilidade e clara separação de responsabilidades.

A estrutura é dividida em:

* **CoreModule:** O "coração" da aplicação. Contém serviços globais (Singletons), Interceptors (Auth, Error Handling) e Guards de rota. Carregado apenas uma vez no `AppModule`.
* **SharedModule:** Componentes visuais reutilizáveis (botões, inputs, cards), Pipes e Diretivas. Importado pelos módulos de funcionalidade.
* **Feature Modules:** Módulos de negócio (Dashboard, Transações, Contas) carregados sob demanda via **Lazy Loading**, otimizando o tempo de carregamento inicial da aplicação.

### 🔌 Integração com Backend
A comunicação é feita via `HttpClient` consumindo a API REST Spring Boot.
- **Interceptors:** Injeção automática de Token JWT e tratamento global de erros HTTP.
- **Models:** Interfaces TypeScript estritas espelhando as entidades JPA para garantir tipagem forte.

---

## 🛠️ Stack Tecnológica

* **Framework:** Angular 17+
* **Linguagem:** TypeScript
* **Estilização:** SCSS (Sass) com arquitetura BEM/Modular.
* **UI Components:** Angular Material (Customizado).
* **Reatividade:** RxJS (Observables, Subjects e Operators).
* **Gerenciamento de Estado:** Baseado em Services (BehaviorSubject).

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
