import * as amqp from 'amqplib'

export class RabbitMQConnection {
  private connection: amqp.Connection | null = null
  private isConnected: boolean = false
  private connectionUrl: string
  private reconnectInterval: number
  private isEnabled: boolean = false

  constructor(connectionUrl: string, reconnectInterval: number = 5000) {
    this.connectionUrl = connectionUrl
    this.reconnectInterval = reconnectInterval
  }

  async connect() {
    try {
      this.isConnected = false
      this.connection = null
      this.isEnabled = true
      this.connection = await amqp.connect(this.connectionUrl)
      this.connection.on('error', this.scheduleReconnect)
      this.isConnected = true
    } catch (error: any) {
      console.error(`Failed to connect to RabbitMQ: ${error.message}`)
      this.scheduleReconnect()
    }
  }

  async createChannel(): Promise<amqp.Channel | null> {
    if (this.connection) return await this.connection.createChannel()
    await this.connect()
    return this.createChannel()
  }

  private scheduleReconnect() {
    if (this.isEnabled)
      setTimeout(() => {
        this.connect()
          .then(() => {
            console.log('Reconnected to RabbitMQ')
          })
          .catch((error) => {
            console.error(`Reconnection to RabbitMQ failed: ${error.message}`)
            this.scheduleReconnect()
          })
      }, this.reconnectInterval)
  }

  async close() {
    this.isEnabled = false
    if (this.connection) {
      await this.connection.close()
      this.isConnected = false
    }
  }
}
