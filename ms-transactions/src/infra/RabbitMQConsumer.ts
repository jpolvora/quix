import amqp from 'amqplib'
import { RabbitMQConnection } from './RabbitMQConnection'

export class RabbitMQConsumer<TMessage = any, TResult = boolean> {
  private channel: amqp.Channel | null = null
  private connection: RabbitMQConnection | null = null

  constructor(
    private readonly connectionFactory: () => Promise<RabbitMQConnection>,
    private readonly queueName: string,
    private readonly eventHandler: (msg: TMessage) => Promise<TResult>,
  ) {}

  async stopConsuming() {
    if (this.channel) {
      await this.channel.close()
      console.log(`Stopped consuming from queue: ${this.queueName}`)
    }
  }

  async getConnection() {
    if (!this.connection) this.connection = await this.connectionFactory()

    return this.connection
  }

  async getChannel(): Promise<amqp.Channel | null> {
    if (!this.channel) {
      try {
        const conn = await this.getConnection()
        this.channel = await conn?.createChannel()
      } catch (error) {}
    }
    return this.channel
  }

  async stop() {
    await this.stopConsuming()
    if (this.connection) await this.connection.close()
    this.connection = null
  }

  async startConsuming() {
    try {
      this.channel = await this.getChannel()
      if (!this.channel) throw new Error('Channel not created')

      await this.channel.assertQueue(this.queueName, {
        durable: true,
      })

      await this.channel.prefetch(1)

      console.log(`Started consuming from queue: ${this.queueName}`)

      this.channel.consume(this.queueName, async (message) => {
        if (message) {
          console.log('Received message', this.queueName)
          const json = message.content.toString()
          const dto = JSON.parse(json) as TMessage
          if (dto) {
            const ack = await this.eventHandler(dto)
            return ack ? this.channel?.ack(message) : this.channel?.nack(message)
          }
          this.channel?.nack(message)
        }
      })
    } catch (errorConnect) {
      console.log('Error connecting to RabbitMQ: ', errorConnect)
    }
  }
}
