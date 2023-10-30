import { IHaveStatusCode } from './IHaveStatusCode'

export class DbError extends Error implements IHaveStatusCode {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.name = 'DbError'
    this.statusCode = 500
  }
}
