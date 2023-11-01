import { AccountDTO } from '@/data/AccountDTO'
import { TransactionDTO } from '@/data/TransactionDTO'
import { Decimal } from '@prisma/client/runtime/library'

export interface IRespository {}

export interface IAccountRepository {
  getAccount(id: string): Promise<AccountDTO | null>
  getAccounts(skip: number, take: number): Promise<AccountDTO[]>
  getTotalAccounts(filter: string): Promise<number>
  createAccount(input: AccountDTO): Promise<AccountDTO>
  save(input: AccountDTO): Promise<AccountDTO>
  updateBalance(accountId: string, balance: Decimal): Promise<AccountDTO | null>
}

export interface ITransactionRepository {
  deposit(accountId: string, value: number): Promise<TransactionDTO>

  getAllTransactionsByAccount(accountId: string): Promise<TransactionDTO[]>
}
