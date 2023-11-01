import { prisma } from '@/infra/prisma-client'
import { poupancaEnabled, poupancaDisabled, correnteEnabled, correnteDisabled } from './data'
import { agent as request } from 'supertest'
import { ExpressApp } from '@/application/ExpressApp'
import { env } from '@/application/config/env'

beforeAll(async () => {
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
  it('should respond with status 200 when GET /', async () => {
    //arrange
    const sut = new ExpressApp(env.PORT).getApp()

    //act
    const response = await request(sut).get('/')

    //assert
    expect(response.statusCode).toBe(200)

    //efetuar um depósito
    //gravar evento na tabela de eventos
  })
})
