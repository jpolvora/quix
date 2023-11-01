export type AppConfig = {
  amqpUrl: string
}
export default {
  amqpUrl: process.env.AMQP_URL || '',
} as AppConfig
