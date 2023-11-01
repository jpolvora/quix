import { AccountsRepository, DbDeposit, TransactionPublisher, TransactionRepository } from '@/data'
import { prisma } from '@/infra/prisma-client'
import { Request, Response } from 'express'
import { DepositHandler } from './actions/DepositHandler'
import { DbUpdateBalance } from '@/data/DbUpdateBalance'
import { RabbitMQConnection, RabbitMQConsumer } from '@/infra'
import { IUpdateBalance, IDeposit } from '@/domain/use-cases'
import { AccountDTO } from '@/data/AccountDTO'
import { AccountEvents, TransactionEvents } from '@/domain/AccountEvents'
import { TransactionDTO } from '@/data/TransactionDTO'
import env from './config/env'

export const rabbitMqConnectionPublish = new RabbitMQConnection(env.amqpUrl)
export const rabbitMqConnectionConsume = new RabbitMQConnection(env.amqpUrl)

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

// HANDLERS => HTTP

export const makeDummyHandler = () => (req: Request, res: Response) => res.send(req.originalUrl)

export const makeDepositHandler = () => new DepositHandler(makeDepositUseCase).getHandler()

// HANDLERS => Consumers

export const makeConsumeAccountCreatedEvent = (callback: (dto: AccountDTO) => Promise<boolean>) =>
  new RabbitMQConsumer<AccountDTO>(rabbitMqConnectionConsume, AccountEvents.ACCOUNT_CREATED, callback)

export const makeConsumeDepositMadeEvent = (callback: (dto: TransactionDTO) => Promise<boolean>) =>
  new RabbitMQConsumer<TransactionDTO>(rabbitMqConnectionConsume, TransactionEvents.TRANSACTION_DEPOSIT, callback)
