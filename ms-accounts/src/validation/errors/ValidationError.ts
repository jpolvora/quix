import { IHaveStatusCode } from './IHaveStatusCode'

export class ValidationError extends Error implements IHaveStatusCode {
  statusCode: number

  constructor(message: string) {
    super(`ValidationError: ${message}`)
    this.name = 'ValidationError'
    this.statusCode = 400
  }
}
