import { createMQProducer } from '@/infra/createMQProducer'

export class CreateAccountNotifier {
  async produce(msg: string) {
    try {
      const producer = await createMQProducer('Q_ACCOUNT_CREATED')
      return producer(msg)
    } catch (error) {
      console.error(error)
    }
  }
}
