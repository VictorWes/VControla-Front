# 🚀 VControla - Frontend

![Angular](https://img.shields.io/badge/angular_19-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Angular Material](https://img.shields.io/badge/angular_material-%23007ACC.svg?style=for-the-badge&logo=angular&logoColor=white)
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

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ad4a26a5-a690-4d80-befb-e16fefffdc5d" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a0cf51cb-0612-4e1f-9802-d916820de5db" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/812b2e58-0dc6-478e-8e5d-641846198fe5" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/affdcd12-3055-47bc-947c-a616ccf06291" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a279ffce-124c-4341-9eaf-f08054d87e49" />




---

## 🎯 Funcionalidades Principais

### 💰 Gestão de Transações (CRUD Completo)

- **Listagem Inteligente:** Tabela interativa com paginação (server-side ou client-side).
- **Filtros Dinâmicos:** Filtragem instantânea por Conta Bancária e Busca textual (Descrição/Valor).
- **Operações:** Criação, Edição e Exclusão de receitas e despesas com atualização em tempo real do saldo.
- **Feedback Visual:** Indicadores de status e modais de confirmação para ações críticas (estorno automático ao excluir).
- **Categorização:** Identificação visual de receitas (verde) e despesas (vermelho).

### 📊 Dashboard Financeiro

- **Resumo Mensal:** Visualização de receitas, despesas e saldo consolidado do mês atual.
- **Visão Geral de Contas:** Listagem de todas as contas bancárias com saldos atualizados em tempo real.
- **Visão Geral de Cartões:** Exibição de todos os cartões de crédito com limite disponível e fatura atual.
- **Saudação Personalizada:** Mensagem dinâmica baseada no horário do dia (Bom dia, Boa tarde, Boa noite).
- **Ações Rápidas:** Botões para acessar rapidamente o gerenciamento de contas e cartões.

### 🏦 Controle de Contas Bancárias

- **CRUD Completo:** Criação, visualização, edição e exclusão de contas bancárias.
- **Sistema de Tipos:** Categorização personalizável (Conta Corrente, Poupança, Investimentos, etc.).
- **Gestão de Tipos de Conta:** Interface dedicada para criar e gerenciar tipos de conta.
- **Saldos em Tempo Real:** Atualização automática do saldo conforme transações são registradas.
- **Validações:** Controle de exclusão com verificação de vínculos e transações associadas.

### 💳 Gestão de Cartões de Crédito

- **CRUD de Cartões:** Cadastro completo com nome, bandeira, limite e dia de fechamento/vencimento.
- **Registro de Compras:** Sistema para adicionar compras com valor, descrição e parcelamento.
- **Controle de Parcelamento:** Gestão de compras parceladas com visualização de cada parcela.
- **Pagamento de Faturas:** Interface para registrar pagamento total ou parcial da fatura com seleção de conta de débito.
- **Associação com Contas:** Vinculação de pagamentos às contas bancárias para manter o fluxo de caixa sincronizado.
- **Paginação de Compras:** Navegação eficiente através do histórico de compras de cada cartão.
- **Cálculo Automático:** Limite disponível e total da fatura calculados automaticamente.

### 📋 Planejamento Financeiro

- **Gestão de Carteiras:** Criação de carteiras para objetivos específicos (Reserva de Emergência, Casa, Viagem, Carro, etc.).
- **Controle de Saldo:** Acompanhamento de saldo real vs. saldo previsto por carteira.
- **Operações Diversas:**
  - ➕ Adicionar Saldo: Incrementar valor em uma carteira específica.
  - 💸 Registrar Gasto: Debitar valor e manter histórico de gastos.
  - 💰 Resgatar Valor: Sacar montante da carteira.
  - ➖ Diminuir Saldo: Ajustar saldo manualmente.
- **Paginação e Organização:** Interface limpa com suporte a múltiplas carteiras paginadas.
- **Validações:** Controle de saldo negativo e confirmações para operações críticas.

### � Login com Google (OAuth 2.0)

- **Google Sign-In:** Botão nativo do Google integrado à tela de login.
- **OAuth Completo:** Autenticação via `@abacritt/angularx-social-login` com `GoogleLoginProvider`.
- **Fluxo Transparente:** O `idToken` do Google é enviado ao backend (`POST /usuarios/google`) para validação e geração do JWT.
- **Experiência Unificada:** Usuários Google são identificados automaticamente no perfil (`isGoogleAccount`).

### 👤 Perfil do Usuário

- **Menu de Usuário:** Dropdown no header com foto/ícone do perfil.
- **Edição de Perfil:** Formulário reativo para atualizar nome e e-mail do usuário.
- **Alteração de Senha:** Formulário dedicado com validação de senha atual, nova senha e confirmação.
- **Detecção de Conta Google:** Campo de e-mail desabilitado automaticamente para contas vinculadas ao Google.
- **Atualização em Tempo Real:** Nome do usuário atualizado no header via `BehaviorSubject` após salvar.
- **Logout Seguro:** Desconexão com limpeza de tokens e redirecionamento para login.

### 🔑 Recuperação de Senha

- **Esqueci Minha Senha:** Página dedicada para solicitar redefinição de senha por e-mail.
- **Redefinição via Token:** Página de nova senha com validação de token recebido por e-mail.
- **Validação Completa:** Formulário reativo com confirmação de senha e feedback visual.
- **Segurança:** Limpeza automática do `localStorage` ao acessar a página de redefinição.

### 📄 Páginas Institucionais

- **Termos de Uso:** Página estática com os termos de utilização da plataforma.
- **Política de Privacidade:** Página estática com a política de privacidade.
- **Suporte:** Página de contato e suporte ao usuário.
- **Layout Próprio:** Shell institucional com header e footer reutilizáveis via `TemplateModule`.

---

## 🏗️ Arquitetura e Decisões Técnicas

Diferente da abordagem simplificada (_Standalone Components_), este projeto adota uma arquitetura baseada em **NgModules** para garantir organização empresarial, escalabilidade e clara separação de responsabilidades.

A estrutura é dividida em:

- **CoreModule:** O "coração" da aplicação. Contém 7 serviços globais (Singletons), Interceptor de autenticação inteligente e 2 Guards de rota funcionais. Carregado apenas uma vez no `AppModule`.
- **SharedModule:** Componentes visuais reutilizáveis (VCard), Pipes e Diretivas. Importado pelos módulos de funcionalidade.
- **Feature Modules:** 7 módulos de negócio (Auth, Dashboard, Transações, Contas, Cartões, Planejamento, Perfil) carregados sob demanda via **Lazy Loading**, otimizando o tempo de carregamento inicial.
- **Pages:** Páginas standalone fora dos feature modules (Recuperação de Senha, Institucionais) declaradas diretamente no `AppModule` ou em módulos próprios.

### 🔌 Integração com Backend

A comunicação é feita via `HttpClient` consumindo a API REST Spring Boot (hospedada no Render).

- **Interceptor Inteligente:** Injeção automática de Token JWT com tratamento seletivo de erros 401/403 — rotas públicas (`nova-senha`, `recuperar-senha`, `login`) são excluídas do redirect forçado.
- **Models:** 11 interfaces/types TypeScript estritas espelhando as entidades JPA para garantir tipagem forte.
- **Google OAuth:** Integração completa com `GoogleLoginProvider` — o `idToken` é enviado ao backend para validação e criação/autenticação do usuário.
- **Paginação Híbrida:** Client-side para transações e planejamento; Server-side (`Page<T>`) para compras de cartão de crédito.

---

## 🛠️ Stack Tecnológica

- **Framework:** Angular 17+
- **Linguagem:** TypeScript
- **Estilização:** SCSS (Sass) com arquitetura BEM/Modular.
- **UI Components:** Angular Material 19 (Customizado) - Dialogs, Cards, Tables, Expansion Panels, Menus, Toolbars, Sidenav, Slide Toggle, Datepicker.
- **Autenticação Social:** Google OAuth via `@abacritt/angularx-social-login`.
- **JWT:** `jwt-decode` para decodificação e validação de tokens no client-side.
- **Reatividade:** RxJS (Observables, Subjects e Operators).
- **Gerenciamento de Estado:** Baseado em Services (BehaviorSubject).
- **Roteamento:** Angular Router com Lazy Loading e Guards.
- **HTTP:** HttpClient com Interceptors para autenticação e tratamento de erros.
- **Validação:** Reactive Forms com validadores customizados.
- **Localização:** pt-BR configurado globalmente (datas, moedas, números).
- **Build:** esbuild via `@angular-devkit/build-angular:application`.

---

## 📂 Estrutura de Pastas

```text
src/
├── app/
│   ├── core/              # Serviços singleton, interceptors, guards, models globais
│   │   ├── guards/        # auth.guard.ts (JWT), redirect.guard.ts (root redirect)
│   │   ├── interceptors/  # auth.interceptor.ts (JWT + smart 401/403 handling)
│   │   ├── models/        # Interfaces TypeScript (11 interfaces/types em 9 arquivos)
│   │   └── services/      # 7 services (auth, conta, transacao, cartao-credito, dashboard, financeiro, tipo-conta)
│   ├── shared/            # Componentes UI reutilizáveis
│   │   └── components/    # v-card
│   ├── features/          # Módulos de negócio (Lazy Loaded)
│   │   ├── auth/          # Login (com Google OAuth) e Cadastro
│   │   ├── dashboard/     # Dashboard Home com resumo financeiro
│   │   ├── transacoes/    # Listagem e gestão de transações
│   │   │   ├── components/  # transacao-cadastro (dialog)
│   │   │   └── pages/       # transacao-lista
│   │   ├── contas/        # Gestão de contas bancárias
│   │   │   ├── components/  # conta-dialog, tipo-conta-dialog
│   │   │   └── pages/       # conta-lista
│   │   ├── cartoes/       # Gestão de cartões de crédito
│   │   │   ├── components/  # cartao-dialog, compra-dialog, pagamento-dialog, selecao-conta-dialog
│   │   │   └── pages/       # cartoes-view
│   │   ├── planejamento/  # Gestão de carteiras financeiras
│   │   │   ├── components/  # modal-saldo, modal-diminuir-saldo, modal-gasto, modal-resgatar
│   │   │   └── pages/       # planejamento-view
│   │   └── perfil/        # Edição de perfil e alteração de senha
│   │       └── pages/       # perfil-view
│   ├── pages/             # Páginas standalone (fora dos feature modules)
│   │   ├── auth/          # Recuperação de senha
│   │   │   ├── nova-senha/       # Redefinição de senha via token
│   │   │   └── recuperar-senha/  # Solicitação de recuperação por e-mail
│   │   └── institucional/ # Páginas institucionais
│   │       ├── institucional-layout/  # Shell com header/footer
│   │       ├── termos/               # Termos de uso
│   │       ├── privacidade/          # Política de privacidade
│   │       └── suporte/              # Página de suporte
│   ├── template/          # Layout da aplicação autenticada
│   │   ├── layout/        # Sidenav + Toolbar + Router Outlet
│   │   ├── header/        # Header com menu de usuário
│   │   └── footer/        # Footer reutilizável
│   ├── app.module.ts
│   └── app-routing.module.ts
├── environments/          # environment.ts (prod) + environment.development.ts (dev)
└── public/

🛣️ Roadmap e Próximos Passos

### ✅ Concluído
- [x] Arquitetura Base (Core/Shared/Features com NgModules)
- [x] Sistema de Autenticação (Login/Cadastro)
- [x] **Login com Google (OAuth 2.0)**
- [x] Interceptors (JWT e Error Handling com exclusão de rotas públicas)
- [x] Guards de Rota (AuthGuard e RedirectGuard funcionais)
- [x] CRUD de Contas Bancárias
- [x] CRUD de Tipos de Conta (com ComportamentoConta)
- [x] CRUD de Transações com Estorno Automático
- [x] Filtros e Paginação no Frontend (client-side + server-side)
- [x] Dashboard com Resumo Financeiro Completo
- [x] Sistema de Planejamento Financeiro (Carteiras)
- [x] CRUD de Cartões de Crédito
- [x] Sistema de Compras e Parcelamento
- [x] Pagamento de Faturas com Integração de Contas
- [x] Menu de Usuário com Logout
- [x] **Página de Editar Perfil do Usuário (nome, e-mail)**
- [x] **Alteração de Senha (com validação de senha atual)**
- [x] **Detecção de Conta Google no Perfil**
- [x] **Recuperação de Senha por E-mail**
- [x] **Redefinição de Senha via Token**
- [x] **Páginas Institucionais (Termos, Privacidade, Suporte)**
- [x] **Migração para Angular 19**
- [x] **Localização pt-BR (datas, moedas, números)**
- [x] Deploy Automático (Vercel)
- [x] Layout Responsivo com Material Design

### 🚧 Em Desenvolvimento / Próximos Passos
- [ ] Dashboard com Gráficos Avançados (Chart.js ou Ngx-Charts)
- [ ] **Gestão Detalhada de Faturas por Período**
- [ ] Relatórios e Exportação de Dados (PDF/Excel)
- [ ] Modo Escuro (Dark Mode)
- [ ] Notificações e Alertas de Gastos
- [ ] **Gestão de Orçamentos por Categoria**
- [ ] **Histórico de Transações com Filtros Avançados**
```
