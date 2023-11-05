import 'dotenv/config'
import { prisma } from '@/infra/prisma-client'
import { poupancaEnabled, poupancaDisabled, correnteEnabled, correnteDisabled } from './data'
import { agent as request } from 'supertest'
import { ExpressApp } from '@/application/ExpressApp'
import { env } from '@/application/config/env'
import { RabbitMQApp } from '@/application'
import { AccountsRepository } from '@/data'

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    return setTimeout(() => {
      return resolve()
    }, ms)
  })
}

let rabbitApp: RabbitMQApp
let expressApp: ExpressApp

beforeEach(async () => {
  console.log(env)

  await prisma.$connect()
  await prisma.accounts.deleteMany()
  await prisma.transactions.deleteMany()

  await prisma.accounts.createMany({
    data: [poupancaEnabled, poupancaDisabled, correnteEnabled, correnteDisabled],
  })

  expressApp = new ExpressApp(env.PORT)
  rabbitApp = new RabbitMQApp()
})

afterEach(async () => {
  await prisma.$disconnect()
  await expressApp.stop()
  await rabbitApp.stop()
})

describe('Default Handler', () => {
  it('should respond with status 200 when GET /', async () => {
    //arrange
    const sut = expressApp.getApp()

    //act
    const response = await request(sut).get('/')

    //assert
    expect(response.statusCode).toBe(200)
  })
})

describe('SAGA Tests Handler', () => {
  it(
    'should make deposit when POST /deposit',
    async () => {
      //arrange
      await rabbitApp.start()
      const sut = expressApp.getApp()

      const payload = {
        amount: '123.45',
      }

      //act
      const response = await request(sut)
        .post(`/deposit/${correnteEnabled.id}`)
        .send({
          ...payload,
        })

      //assert
      expect(response.statusCode).toBe(201)
      expect(response.body).toMatchObject({
        success: true,
        type: 'CASH_DEPOSIT',
        source: '00000000-0000-0000-0000-000000000000',
        target: correnteEnabled.id,
        amount: payload.amount,
      })

      await sleep(3000) //wait msg processed
      //efetuar um depósito
      //gravar evento na tabela de eventos
      const accountsRepository = new AccountsRepository(prisma)
      const account = await accountsRepository.getAccount(correnteEnabled.id)
      //console.log(account)
      const balance = account?.balance?.toString()

      expect(balance).toBe(payload.amount)
    },
    12 * 1000,
  )
})
