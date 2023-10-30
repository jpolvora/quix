// import { IListAccounts } from "@/use-cases";
// import DbListAccounts from "@/data/DbListAccounts";
// import { ICreateAccount } from "@/use-cases/ICreateAccount";
// import DbCreateAccount from "@/data/DbCreateAccount";
// import AccountsRepository from "@/data/DbAccountsRepository";
// import { IPrismaClientWrapper, PrismaClientWrapper } from '@/infra/prisma-client'

import AccountsRepository from '@/data/DbAccountsRepository'
import DbCreateAccount from '@/data/DbCreateAccount'
import DbListAccounts from '@/data/DbListAccounts'
import { IChangeAccountType, IListAccounts } from '@/domain/use-cases'
import { ICreateAccount } from '@/domain/use-cases/ICreateAccount'
import { prisma } from '@/infra/prisma-client'
import { IGetAccount } from '@/domain/use-cases/IGetAccount'
import DbGetAccount from '@/data/DbGetAccount'
import {
  ChangeAccountTypeHandler,
  CreateAccountHandler,
  DisableAccountHandler,
  EnableAccountHandler,
  GetAccountHandler,
  ListAccountsHandler,
} from './actions'
import { DbChangeAccountType } from '@/data'
import { IDisableAccount } from '@/domain/use-cases/IDisableAccount'
import { DbDisableAccount } from '@/data/DbDisableAccount'
import { DbEnableAccount } from '@/data/DbEnableAccount'
import { CreateAccountNotifier } from '@/data/CreateAccountProducer'

// const TYPES = {
//     ListAccounts: Symbol.for("ListAccounts"),
//     CreateAccount: Symbol.for("CreateAccount"),
//     AccountRespository: Symbol.for("AccountRespository"),
//     PrismaClientWrapper: Symbol.for("PrismaClientWrapper")
// }

// //const appContainer = new Container();
// // appContainer.bind<IListAccounts>(TYPES.ListAccounts).to(DbListAccounts).inTransientScope();
// // appContainer.bind<ICreateAccount>(TYPES.CreateAccount).to(DbCreateAccount).inTransientScope();
// // appContainer.bind<IPrismaClientWrapper>(TYPES.PrismaClientWrapper).to(PrismaClientWrapper).inSingletonScope();
// // appContainer.bind<AccountsRepository>(TYPES.AccountRespository).toSelf().inTransientScope();

// //export { TYPES, appContainer }

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

export function makeCreateAccountUseCase(): ICreateAccount {
  return new DbCreateAccount(new AccountsRepository(prisma), new CreateAccountNotifier())
}

export function makeChangeAccountTypeUseCase(): IChangeAccountType {
  return new DbChangeAccountType(new AccountsRepository(prisma))
}

export function makeDisableAccountUseCase(): IDisableAccount {
  return new DbDisableAccount(new AccountsRepository(prisma))
}

export function makeEnableAccountUseCase(): IDisableAccount {
  return new DbEnableAccount(new AccountsRepository(prisma))
}

// HANDLERS

export const makeListAccountHandler = () => new ListAccountsHandler(makeListAccountsUseCase).getHandler()

export const makeGetAccountHandler = () => new GetAccountHandler(makeGetAccountUseCase).getHandler()

export const makeCreateAccountHandler = () => new CreateAccountHandler(makeCreateAccountUseCase).getHandler()

export const makeChangeAccountHandler = () => new ChangeAccountTypeHandler(makeChangeAccountTypeUseCase).getHandler()

export const makeDisableAccountHandler = () => new DisableAccountHandler(makeDisableAccountUseCase).getHandler()

export const makeEnableAccountHandler = () => new EnableAccountHandler(makeEnableAccountUseCase).getHandler()
