import { AccountEvents, TransactionEvents } from '@/domain/AccountEvents'
import { processAccountCreated, processDeposit } from './actions'
import { AccountDTO } from '@/data/AccountDTO'
import { TransactionDTO } from '@/data/TransactionDTO'
import { RabbitMQConnection, RabbitMQConsumer } from '@/infra'

export async function adaptConsumersToUseCases(connection: RabbitMQConnection): Promise<void> {
  const consumers = [
    new RabbitMQConsumer<AccountDTO>(connection, AccountEvents.ACCOUNT_CREATED, processAccountCreated),
    new RabbitMQConsumer<TransactionDTO>(connection, TransactionEvents.TRANSACTION_DEPOSIT, processDeposit),
  ]

  await Promise.all(consumers.map((c) => c.startConsuming()))
}
