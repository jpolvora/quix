import { Decimal } from '@prisma/client/runtime/library'

export type TransactionDTO = {
  id: string
  type: string
  source: string
  target: string
  amount: Decimal
  createdAt?: Date
  updatedAt?: Date
}
