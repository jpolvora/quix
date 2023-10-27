# Quix
Implementation of a 'Pix' bank & account services

#### Instruções para executar

É necessário `git`, `node:18`, `docker` e `docker-compose` já instalados e funcionando corretamente.

- Clonar o projeto `git clone https://github.com/jpolvora/quix`
-   `npm install` para instalar as dependências
-   Configurar as variáveis de ambiente => `cp .env.example .env`
-   `npm run db:create` para configurar o banco de dados
-   `npm run build` para transpilar para `./dist`
-   `npm run start:proxy` para executar o api-gateway
-   `npm run start:accounts` para iniciar o microserviço de Gerenciamento de Contas bancárias
-   `npm run start:transactions` para iniciar o microserviço de Gerenciamento de Transações
-   Para rodar todos os serviços via `docker compose` utilize `npm run compose:up`  
-   Para terminar todos os serviços com iniciados via `docker compose` execute `npm run compose:down`
-   Para limpar a pasta `./dist` é recomendável utilizar `npm run clean`

## Overview

### Arquitetura

O projeto foi implementado utilizando arquitetura de microsserviços para demonstrar a utilização de comunicação entre API's, mensageria, bancos de dados, cache, API Gateway. Desta forma, nos aproximamos do mundo real.

O projeto é composto por:

    - Microserviço "Account": responsável pelo cadastro e manutenção de contas bancárias, disponibilizando também o saldo
    - Microserviço "Transactions": responsável pelas transações entre contas
    - Proxy/API Gateway: recebe as requisições externas e roteia para o endpoint/microserviço correspondente
    - CLI para simulação de operações de saque,depósito, transferência. Simula também operações de PIX do banco central (que seria feito por meio de uma integração)

As seguintes funcionalidades estão implementadas:

    - Cadastro de Contas
    - Transferência de valores entre contas
    - tipo de transferencia
    - moeda
    - valor
    - agendamento
    - chaves pix
    - usuarios

# Tecnologias utilizadas

    - Arquitetura em microserviços
    - Rabbit
    - Postgres
    - Typescript
    - Redis