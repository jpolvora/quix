import { AccountEvents } from '@/domain/AccountEvents'
import { createConsumer } from '@/infra/createConsumer'
import { processAccountCreated, processDeposit } from './actions'
import { AccountDTO } from '@/data/AccountDTO'
import { ConsumeMessage } from 'amqplib'
import { TransactionDTO } from '@/data/TransactionDTO'

export async function adaptConsumersToUseCases(): Promise<void> {
  await Promise.all([
    createConsumer(AccountEvents.TRANSACTION_DEPOSIT).then((fn) => fn(depositEventHandler)),
    createConsumer(AccountEvents.ACCOUNT_CREATED).then((fn) => fn(accountCreatedEventHandler)),
  ])
}

async function accountCreatedEventHandler(msg: ConsumeMessage): Promise<boolean> {
  console.log('accountCreatedEventHandler', msg)

  const dto = JSON.parse(msg.content.toString()) as AccountDTO
  if (dto) {
    return await processAccountCreated(dto)
  }
  return false
}

async function depositEventHandler(msg: ConsumeMessage): Promise<boolean> {
  console.log('depositEventHandler', msg)

  const dto = JSON.parse(msg.content.toString()) as TransactionDTO
  if (dto) {
    return await processDeposit(dto)
  }
  return false
}
