import { IHaveStatusCode } from './IHaveStatusCode'

export class MissingParamError extends Error implements IHaveStatusCode {
  statusCode: number

  constructor(paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
    this.statusCode = 422
  }
}
