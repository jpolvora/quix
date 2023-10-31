// import { IListAccounts } from "@/use-cases";
// import DbListAccounts from "@/data/DbListAccounts";
// import { ICreateAccount } from "@/use-cases/ICreateAccount";
// import DbCreateAccount from "@/data/DbCreateAccount";
// import AccountsRepository from "@/data/DbAccountsRepository";
// import { IPrismaClientWrapper, PrismaClientWrapper } from '@/infra/prisma-client'

import { AccountsRepository, DbDeposit, TransactionPublisher, TransactionRepository } from '@/data'
import { prisma } from '@/infra/prisma-client'
import { Request, Response } from 'express'
import { IDeposit } from '@/domain/use-cases/IDeposit'
import { DepositHandler } from './actions/DepositHandler'
import { DbUpdateBalance } from '@/data/DbUpdateBalance'
import { RabbitMQConnection } from '@/infra'
import { IUpdateBalance } from '@/domain/use-cases'

export type ServiceRegistration = {
  [key: string]: Function
}

export const rabbitMqConnection = new RabbitMQConnection(process.env.AMQP_URL, 60 * 1000)

//USE CASES

export function makeDepositUseCase(): IDeposit {
  return new DbDeposit(
    new AccountsRepository(prisma),
    new TransactionRepository(prisma),
    new TransactionPublisher(rabbitMqConnection),
  )
}

export const makeUpdateBalanceUseCase = (): IUpdateBalance =>
  new DbUpdateBalance(
    new AccountsRepository(prisma),
    new TransactionRepository(prisma),
    new TransactionPublisher(rabbitMqConnection),
  )

// HANDLERS => HTTP

export const makeDummyHandler = () => (req: Request, res: Response) => res.send(req.originalUrl)

export const makeDepositHandler = () => new DepositHandler(makeDepositUseCase).getHandler()

// HANDLERS => Consumers
