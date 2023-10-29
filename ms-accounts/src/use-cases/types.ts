import { AccountDTO } from '@/data/AccountDTO'
import { MissingParamError } from '@/validation/MissingParamError'
import { ValidationError } from '@/validation/ValidationError'

export interface IUseCase<TInput, TOuput> {
  run(input: TInput): Promise<TOuput>
}

export type Result = {
  success: boolean
  error?: ValidationError | MissingParamError | Error | string
}

export type Paging = {
  page: number
  pageSize: number
}

export type CreateAccountInput = {
  id: string
  accountType: string
}

export type CreateAccountOuput = Result & Paging

export type ListAccountsOutput = Result &
  Paging & {
    data?: AccountDTO[]
  }

export type ListAccountsInput = Paging
