# Quix
Implementation of a 'Pix' bank & account services

#### Instruções para executar

É necessário `git`, `node:18`, `docker` e `docker-compose` já instalados e funcionando corretamente.

- Clonar o projeto `git clone https://github.com/jpolvora/quix`
-   Rodar o comando `npm install` para instalar as dependências

-   Para rodar os serviços utilize `docker compose up`


## Overview

### Arquitetura

O projeto foi implementado utilizando arquitetura de microsserviços para demonstrar a utilização de comunicação entre API's, mensageria, bancos de dados, cache, API Gateway. Desta forma, nos aproximamos do mundo real.

O projeto é composto por:

    - Microserviço "Account": responsável pelo cadastro e manutenção de contas bancárias, disponibilizando também o saldo
    - Microserviço "Transactions": responsável pelas transações entre contas
    - Proxy/API Gateway: recebe as requisições externas e roteia para o endpoint/microserviço correspondente
    - Client para simulação de operações de saque,depósito, transferência. Simula também operações de PIX do banco central (que seria feito por meio de uma integração)

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