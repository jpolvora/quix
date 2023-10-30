import { Decimal } from '@prisma/client/runtime/library'
import { AccountDTO } from './AccountDTO'
import { PrismaClient } from '@prisma/client'

export class AccountsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAccount(id: string): Promise<AccountDTO | null> {
    const output = await this.prisma.accounts.findUnique({
      where: {
        id: id,
      },
    })

    return output
  }

  async getAccounts(skip: number, take: number): Promise<AccountDTO[]> {
    const data = await this.prisma.accounts.findMany({
      skip,
      take,
    })

    return data
  }

  async getTotalAccounts(filter: string = '') {
    return await this.prisma.accounts.count()
  }

  async createAccount(input: AccountDTO): Promise<AccountDTO> {
    return await this.prisma.accounts.create({
      data: {
        ...input,
      },
    })
  }

  async save(input: AccountDTO): Promise<AccountDTO> {
    return await this.prisma.accounts.update({
      data: input,
      where: {
        id: input.id,
      },
    })
  }

  async updateBalance(accountId: string, balance: Decimal) {
    try {
      const result = await this.prisma.accounts.update({
        where: {
          id: accountId,
        },
        data: {
          balance,
        },
      })
      return result
    } catch (error) {
      console.log(error)
    }
  }
}
