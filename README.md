# Quix
Implementation of a 'Pix' bank & account services

#### Instruções para executar

É necessário `git`, `node:20`, `docker` e `docker-compose` já instalados e funcionando corretamente.

- Clonar o projeto `git clone https://github.com/jpolvora/quix`
-   `npm install` para instalar as dependências
-   Configurar as variáveis de ambiente => `cp .env.example .env`
-   `npm run db:migrate` para configurar o banco de dados
-   `npm run build` para transpilar para `./dist`
-   `npm run start:proxy` para executar o api-gateway na porta 3000
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

# UseCases

#### Manutenção de contas

`GET api/v1/accounts/:ïd`

    Retorna informações da conta, incluindo o saldo atual, em cache.
    Retorna 200 em caso de sucesso.    
    Retorna 401 se não autenticado
    Retorna 403 se não autorizado
    Retorna 404 se conta não encontrada

`GET api/v1/accounts/list?page=1&pageSize=20`

    Retorna as contas cadastradas no banco de dados
    Retorna 200 em caso de sucesso.
    Retorna 400 em caso de parâmetro inválido
    Retorna 401 se não autenticado
    Retorna 403 se não autorizado

`POST api/v1/accounts/create`

    Cria uma nova conta, validando os parâmetros.
    Gera um evento ACCOUNT_CREATED.
    Retorna 201 em caso de sucesso.
    Retorna 400 em caso de parâmetro inválido
    Retorna 401 se não autenticado
    Retorna 403 se não autorizado

`PATCH api/v1/accounts/change-account-type`
    
    Altera o tipo de uma conta existente
    Gera um evento de ACCOUNT_TYPE_CHANGED
    Retorna 204 em caso de sucesso
    Retorna 400 em caso de parâmetro inválido    
    Retorna 401 se não autenticado
    Retorna 403 se não autorizado
    Retorna 404 em caso de conta não encontrada

`PATCH api/v1/accounts/disable-account`

    Desabilita uma conta. Contas desabilitadas não podem gerar movimentações
    Gera um evento de ACCOUNT_DISABLED.
    Retorna 204 em caso de sucesso
    Retorna 400 em caso de parâmetro inválido    
    Retorna 401 se não autenticado
    Retorna 403 se não autorizado
    Retorna 404 em caso de conta não encontrada

`PATCH api/v1/accounts/enable-account`

    Desabilita uma conta. Contas habilitadas podem gerar movimentações
    Gera um evento ACCOUNT_ENABLED
    Retorna 204 em caso de sucesso
    Retorna 400 em caso de parâmetro inválido    
    Retorna 401 se não autenticado
    Retorna 403 se não autorizado
    Retorna 404 em caso de conta não encontrada