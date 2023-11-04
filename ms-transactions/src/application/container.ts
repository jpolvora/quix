import { AccountsRepository, DbDeposit, TransactionPublisher, TransactionRepository } from '@/data'
import { prisma } from '@/infra/prisma-client'
import { Request, Response } from 'express'
import { DepositAdapter } from './adapters/http/DepositAdapter'
import { DbUpdateBalance } from '@/data/usecases/DbUpdateBalance'
import { RabbitMQConnection, RabbitMQConsumer } from '@/infra'
import { IUpdateBalance, IDeposit, Result, IAccountCreated } from '@/domain/use-cases'
import { env } from './config/env'
import { AccountCreatedAdapter, UpdateBalanceAdapter } from './adapters'
import { AccountEvents, TransactionEvents } from '@/domain/AccountEvents'
import { AccountDTO } from '@/data/dto/AccountDTO'
import { DbAccountCreated } from '@/data/usecases/DbAccountCreated'

export const rabbitMqConnectionPublish = new RabbitMQConnection(env.AMQP_URL)
export const rabbitMqConnectionConsume = new RabbitMQConnection(env.AMQP_URL)

//USE CASES

export function makeDepositUseCase(): IDeposit {
  return new DbDeposit(
    new AccountsRepository(prisma),
    new TransactionRepository(prisma),
    new TransactionPublisher(rabbitMqConnectionPublish),
  )
}

export const makeUpdateBalanceUseCase = (): IUpdateBalance =>
  new DbUpdateBalance(
    new AccountsRepository(prisma),
    new TransactionRepository(prisma),
    new TransactionPublisher(rabbitMqConnectionPublish),
  )

export const makeAccounCreatedUseCase = (): IAccountCreated => new DbAccountCreated(new AccountsRepository(prisma))

// HANDLERS => HTTP

export const makeDepositHandler = () => new DepositAdapter(makeDepositUseCase).getHandler()

export const makeDummyHandler = () => (req: Request, res: Response) => res.send(req.originalUrl)

// HANDLERS => Consumers

export const makeUpdateBalanceAdapter = () =>
  new RabbitMQConsumer<AccountDTO>(
    rabbitMqConnectionConsume,
    TransactionEvents.TRANSACTION_DEPOSIT,
    new UpdateBalanceAdapter(makeUpdateBalanceUseCase).getHandler(),
  )

export const makeAccountCreatedAdapter = () =>
  new RabbitMQConsumer<AccountDTO>(
    rabbitMqConnectionConsume,
    AccountEvents.ACCOUNT_CREATED,
    new AccountCreatedAdapter(makeAccounCreatedUseCase).getHandler(),
  )
