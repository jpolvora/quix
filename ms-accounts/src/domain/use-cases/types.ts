import { AccountDTO } from '@/data/AccountDTO'
import { HttpNotFoundError } from '@/validation/errors/HttpNotFoundError'
import { MissingParamError } from '@/validation/errors/MissingParamError'
import { ValidationError } from '@/validation/errors/ValidationError'

export interface IUseCase<TInput, TOuput extends Result> {
  execute(input: TInput): Promise<TOuput>
}

export type Result = {
  success: boolean
  error?: ValidationError | MissingParamError | HttpNotFoundError
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

export type CreateAccountOuput = Result & {
  data?: AccountDTO
}

export type GetAccountInput = string

export type GetAccountOutput = Result & {
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

export type ChangeAccountTypeOutput = Result

export type DisableAccountInput = string

export type DisableAccountOutput = Result

export type EnableAccountInput = string

export type EnableAccountOutput = Result

export const AccountTypes = {
  Poupança: 'Poupança',
  Corrente: 'Corrente',
}
