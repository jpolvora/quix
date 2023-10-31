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

export type ServiceRegistration = {
  [key: string]: Function
}

//USE CASES

export function makeDepositUseCase(): IDeposit {
  return new DbDeposit(new AccountsRepository(prisma), new TransactionRepository(prisma), new TransactionPublisher())
}

export const makeUpdateBalanceUseCase = () =>
  new DbUpdateBalance(new AccountsRepository(prisma), new TransactionRepository(prisma), new TransactionPublisher())

// HANDLERS => HTTP

export const makeDummyHandler = () => (req: Request, res: Response) => res.send(req.originalUrl)

export const makeDepositHandler = () => new DepositHandler(makeDepositUseCase).getHandler()

// HANDLERS => Consumers
