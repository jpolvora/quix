import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { TransactionDTO } from './TransactionDTO'
import { TRANSACTION_TYPES } from '@/domain/use-cases'
import { ITransactionRepository } from '@/domain/repository'

export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async deposit(accountId: string, value: number): Promise<TransactionDTO> {
    const type = TRANSACTION_TYPES.CASH_DEPOSIT

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

  async getAllTransactionsByAccount(accountId: string): Promise<TransactionDTO[]> {
    return await this.prisma.transactions.findMany({
      where: {
        OR: [
          {
            source: accountId,
          },
          {
            target: accountId,
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
  }
}
