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

export const AccountTypes = {
  Poupança: 'Poupança',
  Corrente: 'Corrente',
}

export const TRANSACTION_TYPES = {
  CASH_DEPOSIT: 'CASH_DEPOSIT',
}
