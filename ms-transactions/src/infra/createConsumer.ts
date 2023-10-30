import amqp, { Connection, ConsumeMessage } from 'amqplib'

export async function createConsumer(queueName: string) {
  try {
    console.log('Connecting to RabbitMQ...')
    const conn: Connection = await amqp.connect(process.env.AMQP_URL)
    console.log('Connected to RabbitMQ...')
    const channel = await conn.createChannel()
    await channel.prefetch(1)
    await channel.assertQueue(queueName)

    return (handler: (msg: amqp.ConsumeMessage) => Promise<boolean>) => {
      channel.consume(queueName, async (msg) => {
        const ack = await handler(msg)
        if (ack) channel.ack(msg)
        else channel.nack(msg)
      })
    }
  } catch (errorConnect) {
    console.log('Error connecting to RabbitMQ: ', errorConnect)
  }
}
