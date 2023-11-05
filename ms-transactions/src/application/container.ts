import { AccountsRepository, TransactionPublisher, TransactionRepository } from '@/data'
import { AccountEvents, TransactionEvents } from '@/domain/AccountEvents'
import { AccountCreated, AccountCreatedAdapter, DbAccountCreated, IAccountCreated } from '@/features/account-created'
import { IUpdateBalance, UpdateBalance, UpdateBalanceAdapter } from '@/features/update-balance'
import { DbUpdateBalance } from '@/features/update-balance/DbUpdateBalance'
import { RabbitMQConnection, RabbitMQConsumer } from '@/infra'
import { prisma } from '@/infra/prisma-client'
import { Request, Response } from 'express'
import { DbDeposit, DepositAdapter, IDeposit } from '../features/make-deposit'
import { env } from './config/env'

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
  new RabbitMQConsumer<UpdateBalance.Input>(
    rabbitMqConnectionConsume,
    TransactionEvents.TRANSACTION_DEPOSIT,
    new UpdateBalanceAdapter(makeUpdateBalanceUseCase).getHandler(),
  )

export const makeAccountCreatedAdapter = () =>
  new RabbitMQConsumer<AccountCreated.Input>(
    rabbitMqConnectionConsume,
    AccountEvents.ACCOUNT_CREATED,
    new AccountCreatedAdapter(makeAccounCreatedUseCase).getHandler(),
  )
