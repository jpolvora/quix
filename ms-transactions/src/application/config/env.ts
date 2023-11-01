export type AppConfig = {
  AMQP_URL: string
  PORT: string
  NODE_ENV: string
  DATABASE_URL: string
}
export const env = {
  AMQP_URL: process.env.AMQP_URL || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
} as AppConfig
