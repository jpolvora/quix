import { createMQProducer } from '@/infra/createMQProducer'

export class CreateAccountNotifier {
  async produce(msg: string) {
    try {
      console.log('will create producer')
      const producer = await createMQProducer('ACCOUNT_CREATED', 'accounts', 'fanout', true)
      console.log('producer created')
      return producer(msg)
    } catch (error) {
      console.error(error)
    }
  }
}
