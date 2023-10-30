import { Decimal } from '@prisma/client/runtime/library'

export type AccountDTO = {
  id: string
  account_type: string
  balance?: Decimal
  enabled?: boolean
  createdAt?: Date
  updatedAt?: Date
}
