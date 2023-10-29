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
import { DisableAccountHandler, EnableAccountHandler, ListAccountsHandler } from './actions'
import { DbChangeAccountType } from '@/data'
import { IDisableAccount } from '@/domain/use-cases/IDisableAccount'
import { DbDisableAccount } from '@/data/DbDisableAccount'
import { DbEnableAccount } from '@/data/DbEnableAccount'

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
  return new DbCreateAccount(new AccountsRepository(prisma))
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

export function makeListAccountHandler() {
  return new ListAccountsHandler(makeListAccountsUseCase).getHandler()
}

export function makeDisableAccountHandler() {
  return new DisableAccountHandler(makeDisableAccountUseCase).getHandler()
}

export function makeEnableAccountHandler() {
  return new EnableAccountHandler(makeEnableAccountUseCase).getHandler()
}
