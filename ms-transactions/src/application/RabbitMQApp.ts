import { IApplication } from '@/shared/types/IApplication'
import { processAccountCreated, processDeposit } from './actions'
import { makeConsumeAccountCreatedEvent, makeConsumeDepositMadeEvent } from './container'
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
    this.queuesConsuming.push(makeConsumeAccountCreatedEvent(processAccountCreated))
    this.queuesConsuming.push(makeConsumeDepositMadeEvent(processDeposit))

    await Promise.all(this.queuesConsuming.map((q) => q.startConsuming()))
  }
}
