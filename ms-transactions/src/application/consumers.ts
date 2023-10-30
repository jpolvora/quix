import { AccountEvents } from '@/domain/AccountEvents'
import { createConsumer } from '@/infra/createConsumer'
import { processDeposit } from './actions/processDeposit'
import { AccountDTO } from '@/data/AccountDTO'
import { ConsumeMessage } from 'amqplib'

export async function setupConsumers(): Promise<void> {
  const consumer = await createConsumer(AccountEvents.TRANSACTION_DEPOSIT)
  consumer(depositHandler)
}

async function depositHandler(msg: ConsumeMessage): Promise<boolean> {
  console.log('depositHandler', msg)

  const dto = JSON.parse(msg.content.toString()) as AccountDTO
  if (dto) {
    return await processDeposit(dto)
  }
  return false
}
