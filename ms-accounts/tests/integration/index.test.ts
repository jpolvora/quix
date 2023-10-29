import { prisma } from '@/infra/prisma-client'
import { poupancaEnabled, poupancaDisabled, correnteEnabled, correnteDisabled, accountToCreateAndVerify } from './data'
import { agent as request } from 'supertest'
import { setupApp } from '@/application/app'
import { HttpNotFoundError, MissingParamError, ValidationError } from '@/validation/errors'
import { randomUUID } from 'crypto'
import { AccountTypes } from '@/domain/use-cases'

beforeAll(async () => {
  await prisma.$connect()

  await prisma.accounts.deleteMany()

  await prisma.accounts.createMany({
    data: [poupancaEnabled, poupancaDisabled, correnteEnabled, correnteDisabled],
  })
})

describe('Default Handler', () => {
  it('should respond with status 200 when GET /', async () => {
    //arrange
    const sut = await setupApp()

    //act
    const response = await request(sut).get('/')

    //assert
    expect(response.statusCode).toBe(200)
  })
})

describe('Get Account Tests', () => {
  it('should respond with status 200 when GET /get/:id with existing account', async () => {
    //arrange
    const sut = await setupApp()

    //act
    const res = await request(sut).get(`/get/${correnteEnabled.id}`)

    //assert
    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBeTruthy()
    expect(res.body.error).toBeFalsy()
    expect(res.body.data).toBeTruthy()
  })

  it('should respond with status 404 when GET /get/:id with non existing account', async () => {
    //arrange
    const sut = await setupApp()

    //act
    const res = await request(sut).get(`/get/${randomUUID()}`)

    //assert
    expect(res.statusCode).toBe(404)
    expect(res.body.success).toBeFalsy()
    expect(res.body.error).toBeTruthy()
  })
})

describe('List Tests', () => {
  it('should respond with status 200 when GET /list with default parameters', async () => {
    //arrange
    const sut = await setupApp()

    //act
    const res = await request(sut).get('/list').query({
      page: 1,
      pageSize: 20,
    })

    //assert
    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBeTruthy()
    expect(res.body.error).toBeFalsy()
    expect(res.body.data).toHaveLength(4)
  })

  it('should return no data when GET /list?page=2', async () => {
    //arrange
    const sut = await setupApp()

    //act
    const res = await request(sut).get('/list').query({
      page: 2,
      pageSize: 10,
    })

    //console.log(res.body)

    //assert
    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBeTruthy()
    expect(res.body.error).toBeFalsy()
    expect(res.body.data).toHaveLength(0)
  })

  it('should return two rows when GET /list?pageSize=2', async () => {
    //arrange
    const sut = await setupApp()

    //act
    const res = await request(sut).get('/list').query({
      page: 1,
      pageSize: 2,
    })

    //console.log(res.body)

    //assert
    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBeTruthy()
    expect(res.body.error).toBeFalsy()
    expect(res.body.data).toHaveLength(2)
  })
})

describe('CRUD tests', () => {
  it('should create account when POST /create', async () => {
    //arrange
    const sut = await setupApp()
    const payload = {
      id: accountToCreateAndVerify.id,
      accountType: accountToCreateAndVerify.account_type,
    }
    //act
    const res = await request(sut)
      .post('/create')
      .set('Content-type', 'application/json')
      .set('Authorization', 'password')
      .send(payload)

    //assert
    expect(res.statusCode).toBe(201)
  })

  it('should NOT create account when POST /create with missing parameters', async () => {
    //arrange
    const sut = await setupApp()
    const payload = {}
    //act
    const res = await request(sut)
      .post('/create')
      .set('Content-type', 'application/json')
      .set('Authorization', 'password')
      .send(payload)

    //console.log(res.body)

    //assert
    expect(res.statusCode).toBe(400)
    expect(res.body.success).toBeFalsy()
    expect(res.body.error).toBe(MissingParamError.name)
  })

  it('should NOT create account when POST /create with existing id', async () => {
    //arrange
    const sut = await setupApp()
    const payload = {
      id: poupancaDisabled.id,
      accountType: 'Poupança',
    }

    //act
    const res = await request(sut)
      .post('/create')
      .set('Content-type', 'application/json')
      .set('Authorization', 'password')
      .send(payload)

    //console.log(res.body)

    //assert
    expect(res.statusCode).toBe(400)
    expect(res.body.success).toBeFalsy()
    expect(res.body.error).toBe(ValidationError.name)
  })
})

describe('Business Tests', () => {
  it('should change existing account type', async () => {
    //arrange
    const sut = await setupApp()

    const payload = {
      accountId: correnteDisabled.id,
      newAccountType: AccountTypes.Poupança,
    }
    //act
    const res = await request(sut)
      .patch('/change-account-type')
      .set('Content-type', 'application/json')
      .set('Authorization', 'password')
      .send(payload)

    //console.log(res.body)

    //assert
    expect(res.statusCode).toBe(204)
  })

  it('should NOT change non existent account type', async () => {
    //arrange
    const sut = await setupApp()

    const payload = {
      accountId: randomUUID(),
      newAccountType: AccountTypes.Corrente,
    }
    //act
    const res = await request(sut)
      .patch('/change-account-type')
      .set('Content-type', 'application/json')
      .set('Authorization', 'password')
      .send(payload)

    //console.log(res.body)

    //assert
    expect(res.statusCode).toBe(404)
    expect(res.body.success).toBeFalsy()
    expect(res.body.error).toBe(HttpNotFoundError.name)
  })

  it('should NOT change account when invalid account type', async () => {
    //arrange
    const sut = await setupApp()

    const payload = {
      accountId: correnteEnabled.id,
      newAccountType: 'TIPO_INVALIDO',
    }
    //act
    const res = await request(sut)
      .patch('/change-account-type')
      .set('Content-type', 'application/json')
      .set('Authorization', 'password')
      .send(payload)

    //console.log(res.body)

    //assert
    expect(res.statusCode).toBe(400)
    expect(res.body.success).toBeFalsy()
    expect(res.body.error).toBe(ValidationError.name)
  })

  it('should disable specific account', async () => {
    //arrange
    const sut = await setupApp()
    //act
    const res = await request(sut)
      .patch(`/disable-account/${poupancaEnabled.id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', 'password')

    //console.log(res.body)

    //assert
    expect(res.statusCode).toBe(204)
  })
})
