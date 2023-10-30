import amqp, { Connection } from 'amqplib'

export type ProducerFunction = (msg: string) => boolean

export async function createMQProducer(
  queueName: string,
  exchange: string = '',
  exchangeType: string = 'fanout',
  durable: boolean = false,
): Promise<ProducerFunction> {
  try {
    console.log('Connecting to RabbitMQ...')
    const conn: Connection = await amqp.connect(process.env.AMQP_URL)
    console.log('Connected to RabbitMQ...')
    const channel = await conn.createChannel()
    if (exchange) {
      await channel.assertExchange(exchange, exchangeType, {
        durable,
      })
      await channel.assertQueue(queueName)
      await channel.bindQueue(queueName, exchange, '')
    } else {
      await channel.assertQueue(queueName, {
        durable,
      })
    }

    return (msg: string) => {
      try {
        console.log('sending message', msg)
        return channel.publish(exchange, '', Buffer.from(msg))
      } catch (error) {
        console.error(error)
        return false
      } finally {
        channel.close()
      }
    }
  } catch (errorConnect) {
    console.log('Error connecting to RabbitMQ: ', errorConnect)
  }
}
