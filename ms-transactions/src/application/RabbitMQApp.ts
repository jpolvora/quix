import { IApplication } from '@/shared/types/IApplication'
import { RabbitMQConsumer } from '@/infra'
import { makeAccountCreatedAdapter, makeUpdateBalanceAdapter } from './container'

export class RabbitMQApp implements IApplication {
  private queuesConsuming: RabbitMQConsumer[] = []

  async stop(): Promise<void> {
    await Promise.all(this.queuesConsuming.map((q) => q.stopConsuming()))
    this.queuesConsuming = []
  }

  getApp() {
    return this
  }

  async start(): Promise<void> {
    this.queuesConsuming.push(makeUpdateBalanceAdapter())
    this.queuesConsuming.push(makeAccountCreatedAdapter())

    await Promise.all(this.queuesConsuming.map((q) => q.startConsuming()))
  }
}
