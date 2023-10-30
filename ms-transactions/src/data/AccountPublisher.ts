import { createMQProducer } from '@/infra/createMQProducer'
import { AccountDTO } from './AccountDTO'
import { TransactionDTO } from './TransactionDTO'
import { AccountEvents } from '@/domain/AccountEvents'

const ExchangeName = 'transactions'
const ExchangeType = 'fanout'

export class TransactionPublisher {
  async publishAccountCreated(dto: AccountDTO) {
    try {
      const msg = JSON.stringify(dto)
      const producer = await createMQProducer(AccountEvents.ACCOUNT_CREATED, ExchangeName, ExchangeType, true)
      return producer(msg)
    } catch (error) {
      console.error(error)
    }
  }

  async publishAccountTypeChanged(dto: AccountDTO) {
    try {
      const msg = JSON.stringify(dto)
      const producer = await createMQProducer(AccountEvents.ACCOUNT_CHANGED, ExchangeName, ExchangeType, true)
      return producer(msg)
    } catch (error) {
      console.error(error)
    }
  }

  async publishAccountEnabled(dto: AccountDTO) {
    try {
      const msg = JSON.stringify(dto)
      const producer = await createMQProducer(AccountEvents.ACCOUNT_ENABLED, ExchangeName, ExchangeType, true)
      return producer(msg)
    } catch (error) {
      console.error(error)
    }
  }

  async publishAccountDisabled(dto: AccountDTO) {
    try {
      const msg = JSON.stringify(dto)
      const producer = await createMQProducer(AccountEvents.ACCOUNT_DISABLED, ExchangeName, ExchangeType, true)
      return producer(msg)
    } catch (error) {
      console.error(error)
    }
  }

  async publishDeposit(dto: TransactionDTO) {
    try {
      const msg = JSON.stringify(dto)
      const producer = await createMQProducer(AccountEvents.TRANSACTION_DEPOSIT, ExchangeName, ExchangeType, true)
      return producer(msg)
    } catch (error) {
      console.error(error)
    }
  }
}
