import 'dotenv/config'
import { prisma } from '@/infra/prisma-client'
import { poupancaEnabled, poupancaDisabled, correnteEnabled, correnteDisabled } from './data'
import { agent as request } from 'supertest'
import { ExpressApp } from '@/application/ExpressApp'
import { env } from '@/application/config/env'

beforeAll(async () => {
  console.log(env)

  await prisma.$connect()
  await prisma.accounts.deleteMany()
  await prisma.transactions.deleteMany()

  await prisma.accounts.createMany({
    data: [poupancaEnabled, poupancaDisabled, correnteEnabled, correnteDisabled],
  })
})

describe('Default Handler', () => {
  it('should respond with status 200 when GET /', async () => {
    //arrange
    const sut = new ExpressApp(env.PORT).getApp()

    //act
    const response = await request(sut).get('/')

    //assert
    expect(response.statusCode).toBe(200)
  })
})

describe('SAGA Tests Handler', () => {
  it('should make deposit when POST /deposit', async () => {
    //arrange
    const sut = new ExpressApp(env.PORT).getApp()
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
      balance: 0,
      type: 'CASH_DEPOSIT',
      source: '00000000-0000-0000-0000-000000000000',
      target: '910481f2-66cc-4bed-a366-cd21f69bd61b',
      amount: '123.45',
    })

    //efetuar um depósito
    //gravar evento na tabela de eventos
  })
})
