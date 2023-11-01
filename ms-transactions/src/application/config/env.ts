export type AppConfig = {
  amqpUrl: string
  PORT: string
  NODE_ENV: string
}
export default {
  amqpUrl: process.env.AMQP_URL || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: '3001',
} as AppConfig
