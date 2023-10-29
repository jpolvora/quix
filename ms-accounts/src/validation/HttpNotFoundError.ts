export class HttpNotFoundError extends Error {
  constructor() {
    super('NotFound')
    this.name = 'HttpNotFoundError'
  }
}
