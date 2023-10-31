import { createMQProducer } from '@/infra/createMQProducer'
import { AccountDTO } from './AccountDTO'
import { TransactionDTO } from './TransactionDTO'
import { AccountEvents } from '@/domain/AccountEvents'

const BalanceExchangeName = 'balance'
const TransactionExchangeName = 'transactions'
const ExchangeType = 'fanout'

export class TransactionPublisher {
  async publishDeposit(dto: TransactionDTO) {
    try {
      const msg = JSON.stringify(dto)
      const producer = await createMQProducer(
        AccountEvents.TRANSACTION_DEPOSIT,
        TransactionExchangeName,
        ExchangeType,
        true,
      )
      return producer(msg)
    } catch (error) {
      console.error(error)
    }
  }

  async publishBalanceUpdated(dto: AccountDTO) {
    try {
      const msg = JSON.stringify(dto)
      const producer = await createMQProducer(AccountEvents.BALANCE_UPDATED, BalanceExchangeName, ExchangeType, true)
      return producer(msg)
    } catch (error) {
      console.error(error)
    }
  }
}
