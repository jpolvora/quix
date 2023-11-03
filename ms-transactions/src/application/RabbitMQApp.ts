import { IApplication } from '@/shared/types/IApplication'
import { RabbitMQConsumer } from '@/infra'

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
    //this.queuesConsuming.push(makeConsumeAccountCreatedEvent())
    //this.queuesConsuming.push(makeConsumeDepositMadeEvent())

    await Promise.all(this.queuesConsuming.map((q) => q.startConsuming()))
  }
}
