🚀 VControla - Frontend (Angular)
Status do Projeto: 

🏗️ Em fase de Setup e Arquitetura de Módulos.

O VControla-Front é o braço visual do ecossistema VControla. Uma aplicação Single Page (SPA) focada em UX financeira, permitindo o controle de gastos, ganhos e faturas de cartão de crédito de forma intuitiva.

🎯 Objetivos do Frontend
Gestão de Transações: Visualização clara de receitas e despesas com filtros por período.

Dashboard Financeiro: Gráficos e indicadores de saldo real vs. saldo previsto.

Controle de Cartão: Interface para gerenciar limites e datas de fechamento.

Parcelamentos: Visualização agrupada de compras parceladas através do transactionGroupId.

🏗️ Arquitetura e Padrões
Diferente do padrão standalone simplificado, este projeto utiliza a arquitetura robusta de NgModules para garantir escalabilidade e separação de responsabilidades:

CoreModule: Serviços globais, interceptors e guardas de rota (Singleton).

SharedModule: Componentes reutilizáveis, pipes e diretivas exportáveis.

Feature Modules: Módulos carregados via Lazy Loading (Dashboard, Transações, Configurações).

🔌 Conexão com o Backend
A integração será feita através do HttpClientModule, consumindo a API REST do VControla (Spring Boot).

Base URL: http://localhost:8080/api

Models: Interfaces TypeScript rigorosas que espelham as entidades JPA do backend.

Interceptors: Tratamento global de erros e inserção automática de tokens JWT.

🛠️ Tecnologias Utilizadas
Angular 17+ (com RxJS para reatividade).

Arquitetura: Baseada em Módulos (NgModule).

Estilização: SCSS (Sass) e Angular Material.
