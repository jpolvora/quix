import { AccountDTO } from './AccountDTO'
import { PrismaClient } from '@prisma/client'

export default class AccountsRepository {
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

  async createAccount(input: AccountDTO): Promise<AccountDTO> {
    return await this.prisma.accounts.create({
      data: {
        ...input,
      },
    })
  }
}
