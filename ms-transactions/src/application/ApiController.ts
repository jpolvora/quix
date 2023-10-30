import { Express } from 'express'
import { makeDepositHandler, makeDummyHandler } from './container'

export class ApiController {
  constructor(private readonly app: Express) {}

  public async configureRoutes() {
    //listar todas as transacoes
    this.app.get('/list', makeDummyHandler())
    //listar todas as transacoes de uma determinada conta
    this.app.get('/list/:id', makeDummyHandler())
    //saque em dinheiro
    this.app.get('/withdawal/:account', makeDummyHandler())
    //deposito em dinheiro
    this.app.post('/deposit/:accountId', makeDepositHandler())
    //transferencia para outra conta
    this.app.get('/transfer/:sourceAccount/:targetAccount', makeDummyHandler())
    //receive pix
    this.app.get('/pix/:targetPix', makeDummyHandler())
    //send pix
    this.app.get('/pix/:sourceAccount/:targetPix', makeDummyHandler())
    //payment
    this.app.get('/payment/:sourceAccount/:doc', makeDummyHandler())
    return Promise.resolve()
  }
}
