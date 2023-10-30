import amqp, { Connection } from 'amqplib'

const createMQProducer = async (queueName: string) => {
  console.log('Connecting to RabbitMQ...')
  try {
    const conn: Connection = await amqp.connect(process.env.AMQP_URL)
    const channel = await conn.createChannel()
    channel.assertQueue(queueName)

    return (msg: string) => {
      try {
        console.log('sending message', msg)
        channel.sendToQueue(queueName, Buffer.from(msg))
        console.log('message sent')
      } catch (error) {
        console.error(error)
      }
    }
  } catch (errorConnect) {
    console.log('Error connecting to RabbitMQ: ', errorConnect)
  }
}

export { createMQProducer }
