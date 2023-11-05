import * as amqp from 'amqplib'

export class RabbitMQConnection {
  private connection: amqp.Connection | null = null
  private channel: amqp.Channel | null = null
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
      this.isEnabled = true
      this.connection = await amqp.connect(this.connectionUrl)
      this.connection.once('error', this.scheduleReconnect.bind(this))
      this.channel = await this.connection.createChannel()
      this.isConnected = true
      console.log('Connected to RabbitMQ')
    } catch (error: any) {
      console.error(`Failed to connect to RabbitMQ: ${error.message}`)
      this.scheduleReconnect()
    }
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

  async getChannel(): Promise<amqp.Channel | null> {
    if (!this.isConnected) {
      //console.warn('Channel is not available. Trying to reconnect...')
      await this.connect()
    }
    return this.channel
  }

  async close() {
    this.isEnabled = false
    if (this.connection) {
      await this.connection.close()
      this.isConnected = false
      console.log('Connection to RabbitMQ closed')
    }
  }
}
