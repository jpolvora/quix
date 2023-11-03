import { AccountDTO } from '@/data/dto/AccountDTO'
import { DbError, EntityNotFoundError } from '@/validation/errors'
import { MissingParamError } from '@/validation/errors/MissingParamError'
import { ValidationError } from '@/validation/errors/ValidationError'

export interface IUseCase<TInput, TOuput extends Result> {
  execute(input: TInput): Promise<TOuput>
}

export type Result = {
  success: boolean
  error?: ValidationError | MissingParamError | EntityNotFoundError | DbError
}

export type HttpResult = Result & {
  statusCode: number
}

export type PagedResult = Result &
  Paging & {
    total: number
  }

export type Paging = {
  page: number
  pageSize: number
}

export type CreateAccountInput = {
  id: string
  accountType: string
}

export type CreateAccountOuput = HttpResult & {
  data?: AccountDTO
}

export type GetAccountInput = string

export type GetAccountOutput = HttpResult & {
  data?: AccountDTO
}

export type ListAccountsOutput = PagedResult & {
  data?: AccountDTO[]
}

export type ListAccountsInput = Paging

export type ChangeAccountTypeInput = {
  accountId: string
  newAccountType: string
}

export type ChangeAccountTypeOutput = HttpResult & {}

export type DisableAccountInput = string

export type DisableAccountOutput = HttpResult

export type EnableAccountInput = string

export type EnableAccountOutput = HttpResult

export const AccountTypes = {
  Poupança: 'Poupança',
  Corrente: 'Corrente',
}

export const TRANSACTION_TYPES = {
  CASH_DEPOSIT: 'CASH_DEPOSIT',
}

export type DepositInput = {
  accountId: string
  amount: number
}

export type DepositOutput = HttpResult & {
  balance: number
}
