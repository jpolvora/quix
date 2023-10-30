// import { IListAccounts } from "@/use-cases";
// import DbListAccounts from "@/data/DbListAccounts";
// import { ICreateAccount } from "@/use-cases/ICreateAccount";
// import DbCreateAccount from "@/data/DbCreateAccount";
// import AccountsRepository from "@/data/DbAccountsRepository";
// import { IPrismaClientWrapper, PrismaClientWrapper } from '@/infra/prisma-client'

import {
  AccountsRepository,
  DbCreateAccount,
  DbListAccounts,
  DbGetAccount,
  DbChangeAccountType,
  DbDisableAccount,
  DbEnableAccount,
  AccountPublisher,
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
  return new DbCreateAccount(new AccountsRepository(prisma), new AccountPublisher())
}

export function makeChangeAccountTypeUseCase(): IChangeAccountType {
  return new DbChangeAccountType(new AccountsRepository(prisma), new AccountPublisher())
}

export function makeDisableAccountUseCase(): IDisableAccount {
  return new DbDisableAccount(new AccountsRepository(prisma), new AccountPublisher())
}

export function makeEnableAccountUseCase(): IEnableAccount {
  return new DbEnableAccount(new AccountsRepository(prisma), new AccountPublisher())
}

// HANDLERS

export const makeListAccountHandler = () => new ListAccountsHandler(makeListAccountsUseCase).getHandler()

export const makeGetAccountHandler = () => new GetAccountHandler(makeGetAccountUseCase).getHandler()

export const makeCreateAccountHandler = () => new CreateAccountHandler(makeCreateAccountUseCase).getHandler()

export const makeChangeAccountHandler = () => new ChangeAccountTypeHandler(makeChangeAccountTypeUseCase).getHandler()

export const makeDisableAccountHandler = () => new DisableAccountHandler(makeDisableAccountUseCase).getHandler()

export const makeEnableAccountHandler = () => new EnableAccountHandler(makeEnableAccountUseCase).getHandler()
