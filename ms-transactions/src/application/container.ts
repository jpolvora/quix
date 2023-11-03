import { AccountsRepository, DbDeposit, TransactionPublisher, TransactionRepository } from '@/data'
import { prisma } from '@/infra/prisma-client'
import { Request, Response } from 'express'
import { DepositAdapter } from './adapters/http/DepositAdapter'
import { DbUpdateBalance } from '@/data/usecases/DbUpdateBalance'
import { RabbitMQConnection, RabbitMQConsumer } from '@/infra'
import { IUpdateBalance, IDeposit, Result } from '@/domain/use-cases'
import { env } from './config/env'
import { UpdateBalanceAdapter } from './adapters'
import { TransactionEvents } from '@/domain/AccountEvents'

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

// HANDLERS => HTTP

export const makeDummyHandler = () => (req: Request, res: Response) => res.send(req.originalUrl)

export const makeDepositHandler = () => new DepositAdapter(makeDepositUseCase).getHandler()

// HANDLERS => Consumers

export const makeUpdateBalanceAdapter = () =>
  new RabbitMQConsumer(
    rabbitMqConnectionConsume,
    TransactionEvents.TRANSACTION_DEPOSIT,
    new UpdateBalanceAdapter(
      () =>
        new DbUpdateBalance(
          new AccountsRepository(prisma),
          new TransactionRepository(prisma),
          new TransactionPublisher(rabbitMqConnectionConsume),
        ),
    ).getHandler(),
  )
