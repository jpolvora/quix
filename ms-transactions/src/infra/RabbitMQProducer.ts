import * as amqp from 'amqplib'
import { RabbitMQConnection } from './RabbitMQConnection'

export class RabbitMQProducer {
  private queueName: string
  private connection: RabbitMQConnection
  private channel: amqp.Channel | null = null

  constructor(queueName: string, connection: RabbitMQConnection) {
    this.queueName = queueName
    this.connection = connection
  }

  async getChannel(): Promise<amqp.Channel | null> {
    if (!this.channel) {
      try {
        this.channel = await this.connection.createChannel()
      } catch (error) {}
    }
    return this.channel
  }

  async publishMessage(message: string): Promise<boolean> {
    try {
      this.channel = await this.getChannel()
      if (!this.channel) throw new Error('Could not create channel')

      await this.channel.assertQueue(this.queueName)
      this.channel.sendToQueue(this.queueName, Buffer.from(message))
      console.log(`Message published to queue: ${this.queueName}`)
      return true
    } catch (error) {
      console.error(`Failed to publish message to queue: ${this.queueName}`)
      return false
    }
  }
}
