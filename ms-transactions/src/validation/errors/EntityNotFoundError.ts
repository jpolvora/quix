import { IHaveStatusCode } from './IHaveStatusCode'

export class EntityNotFoundError extends Error implements IHaveStatusCode {
  statusCode: number
  constructor() {
    super('NotFound')
    this.name = 'EntityNotFoundError'
    this.statusCode = 404
  }
}
