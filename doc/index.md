### Teste Prático - Simulação de Conta Bancária

#### Objetivo:

Desenvolver uma API RESTful para simular uma conta bancária com operações de depósito, saque e transações instantâneas (semelhante ao PIX). Utilize Typescript e Node.js.

#### Requisitos:

1. **Contas Bancárias**
    - Implemente operações CRUD para uma entidade "Conta Bancária".
    - Cada conta deve ter um número único, tipo (corrente, poupança) e saldo.

2. **Depósito e Saque**
    - Implemente funcionalidades para depósito e saque em uma conta.
    - As operações devem atualizar o saldo da conta e serem registradas.

3. **Transações Instantâneas (PIX)**
    - Implemente uma funcionalidade para transferências instantâneas entre contas.
    - O usuário deve ser capaz de fazer uma transferência inserindo apenas o número da conta de destino.
    - As transações devem ser registradas e consultáveis.

4. **Testes**
    - Escreva testes para as funcionalidades implementadas.

5. **Banco de Dados**
    - Utilize um banco de dados de sua escolha.
    - Implemente migrações para criar as tabelas necessárias.

6. **Documentação**
    - Documente as rotas da API e como executar o projeto.

#### Critérios de Avaliação:

- Qualidade do código (organização, padrões de projeto).
- Cobertura e completude dos testes.
- Documentação.