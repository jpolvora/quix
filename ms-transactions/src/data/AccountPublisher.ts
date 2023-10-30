import { createMQProducer } from '@/infra/createMQProducer'
import { AccountDTO } from './AccountDTO'

export const AccountEvents = {
  ACCOUNT_CREATED: 'ACCOUNT_CREATED',
  ACCOUNT_CHANGED: 'ACCOUNT_CHANGED',
  ACCOUNT_DISABLED: 'ACCOUNT_DISABLED',
  ACCOUNT_ENABLED: 'ACCOUNT_ENABLED',
}

const ExchangeName = 'accounts'
const ExchangeType = 'fanout'

export class AccountPublisher {
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
}
