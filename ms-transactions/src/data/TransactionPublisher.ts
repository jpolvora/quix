import { AccountDTO } from './AccountDTO'
import { TransactionDTO } from './TransactionDTO'
import { AccountEvents, TransactionEvents } from '@/domain/AccountEvents'
import { RabbitMQConnection, RabbitMQProducer } from '@/infra'

export class TransactionPublisher {
  constructor(private readonly connection: RabbitMQConnection) {}

  async publishDeposit(dto: TransactionDTO): Promise<boolean> {
    try {
      const msg = JSON.stringify(dto)
      const producer = new RabbitMQProducer(TransactionEvents.TRANSACTION_DEPOSIT, this.connection)

      return await producer.publishMessage(msg)
    } catch (error) {
      console.error(error)
    }

    return false
  }

  async publishBalanceUpdated(dto: AccountDTO): Promise<boolean> {
    try {
      const msg = JSON.stringify(dto)
      const producer = new RabbitMQProducer(AccountEvents.BALANCE_UPDATED, this.connection)
      return await producer.publishMessage(msg)
    } catch (error) {
      console.error(error)
    }

    return false
  }
}
