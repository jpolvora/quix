// import { IListAccounts } from "@/use-cases";
// import DbListAccounts from "@/data/DbListAccounts";
// import { ICreateAccount } from "@/use-cases/ICreateAccount";
// import DbCreateAccount from "@/data/DbCreateAccount";
// import AccountsRepository from "@/data/DbAccountsRepository";
// import { IPrismaClientWrapper, PrismaClientWrapper } from '@/infra/prisma-client'

import {
  AccountsRepository,
  DbDeposit,
  DbListAccounts,
  DbGetAccount,
  DbChangeAccountType,
  DbDisableAccount,
  DbEnableAccount,
  TransactionPublisher,
  TransactionRepository,
} from '@/data'
import {
  ChangeAccountTypeHandler,
  CreateAccountHandler,
  DisableAccountHandler,
  EnableAccountHandler,
  GetAccountHandler,
  ListAccountsHandler,
} from './actions'
import {
  ICreateAccount,
  IChangeAccountType,
  IDisableAccount,
  IListAccounts,
  IGetAccount,
  IEnableAccount,
} from '@/domain/use-cases'
import { prisma } from '@/infra/prisma-client'
import { Request, Response } from 'express'
import { IDeposit } from '@/domain/use-cases/IDeposit'
import { DepositHandler } from './actions/DepositHandler'

export type ServiceRegistration = {
  [key: string]: Function
}

//USE CASES

export function makeGetAccountUseCase(): IGetAccount {
  return new DbGetAccount(new AccountsRepository(prisma))
}

export function makeListAccountsUseCase(): IListAccounts {
  return new DbListAccounts(new AccountsRepository(prisma))
}

export function makeDepositUseCase(): IDeposit {
  return new DbDeposit(new AccountsRepository(prisma), new TransactionRepository(prisma), new TransactionPublisher())
}

export function makeChangeAccountTypeUseCase(): IChangeAccountType {
  return new DbChangeAccountType(new AccountsRepository(prisma), new TransactionPublisher())
}

export function makeDisableAccountUseCase(): IDisableAccount {
  return new DbDisableAccount(new AccountsRepository(prisma), new TransactionPublisher())
}

export function makeEnableAccountUseCase(): IEnableAccount {
  return new DbEnableAccount(new AccountsRepository(prisma), new TransactionPublisher())
}

// HANDLERS

export const makeDummyHandler = () => (req: Request, res: Response) => res.send(req.originalUrl)

export const makeDepositHandler = () => new DepositHandler(makeDepositUseCase).getHandler()
