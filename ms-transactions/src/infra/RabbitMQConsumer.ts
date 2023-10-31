import amqp from 'amqplib'
import { RabbitMQConnection } from './RabbitMQConnection'

export class RabbitMQConsumer<TMessage> {
  private channel: amqp.Channel | null = null

  constructor(
    private readonly connection: RabbitMQConnection,
    private readonly queueName: string,
    private readonly eventHandler: (msg: TMessage) => Promise<boolean>,
  ) {}

  async stopConsuming() {
    if (this.channel) {
      this.channel.close()
      console.log(`Stopped consuming from queue: ${this.queueName}`)
    }
  }

  async startConsuming() {
    try {
      this.channel = await this.connection.getChannel()
      await this.channel.prefetch(1)
      await this.channel.assertQueue(this.queueName)
      console.log(`Started consuming from queue: ${this.queueName}`)

      this.channel.consume(this.queueName, async (message) => {
        if (message) {
          console.log('Received message')
          const dto = JSON.parse(message.content.toString()) as TMessage
          if (dto) {
            const ack = await this.eventHandler(dto)
            return ack ? this.channel.ack(message) : this.channel.nack(message)
          }
        }
      })
    } catch (errorConnect) {
      console.log('Error connecting to RabbitMQ: ', errorConnect)
    }
  }
}
