// import { IListAccounts } from "@/use-cases";
// import DbListAccounts from "@/data/DbListAccounts";
// import { ICreateAccount } from "@/use-cases/ICreateAccount";
// import DbCreateAccount from "@/data/DbCreateAccount";
// import AccountsRepository from "@/data/DbAccountsRepository";
// import { IPrismaClientWrapper, PrismaClientWrapper } from '@/infra/prisma-client'

import AccountsRepository from "@/data/DbAccountsRepository";
import DbCreateAccount from "@/data/DbCreateAccount";
import DbListAccounts from "@/data/DbListAccounts";
import { IListAccounts } from "@/use-cases";
import { ICreateAccount } from "@/use-cases/ICreateAccount";
import { prisma } from "@/infra/prisma-client";

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

export function makeListAccountsUseCase(): IListAccounts {
    return new DbListAccounts(new AccountsRepository(prisma));
}

export function makeCreateAccountUseCase(): ICreateAccount {
    return new DbCreateAccount(new AccountsRepository(prisma));
}