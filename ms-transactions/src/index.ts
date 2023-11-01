import 'dotenv/config'
import './register'
import 'reflect-metadata'
import { env } from './application/config/env'
import { Command } from 'commander'
import { RabbitMQApp, ExpressApp } from './application'

async function start() {
  const options = new Command()
    .option('-p, --port [VALUE]', 'http port', env.PORT)
    .option('-e, --env [VALUE]', 'environment', env.NODE_ENV)
    .parse(process.argv)
    .opts()

  const port = Number(options.port || process.env.PORT)

  if (!port) throw new Error('Invalid port')

  if (options.env) process.env.NODE_ENV = options.env

  const expressApp = new ExpressApp(port)
  const rabbitMqApp = new RabbitMQApp()

  await Promise.all([expressApp.start(), rabbitMqApp.start()])

  if (process.send) process.send('ready') //pm2

  console.log('ms-transactions started at port %s', port)
}

start().catch(console.error.bind(console))
