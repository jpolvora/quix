import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

export class TransactionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async deposit(accountId: string, value: number) {
    const type = 'CASH_DEPOSIT'
    const source = '00000000-0000-0000-0000-000000000000'
    return await this.prisma.transactions.create({
      data: {
        id: randomUUID(),
        type,
        source,
        target: accountId,
        amount: value,
      },
    })
  }
}
