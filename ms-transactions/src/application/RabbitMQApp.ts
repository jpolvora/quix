import { processAccountCreated, processDeposit } from './actions'
import { makeConsumeAccountCreatedEvent, makeConsumeDepositMadeEvent } from './container'

export class RabbitMQApp {
  async start(): Promise<void> {
    Promise.all([
      makeConsumeAccountCreatedEvent(processAccountCreated).startConsuming(),
      makeConsumeDepositMadeEvent(processDeposit).startConsuming(),
    ])
  }
}
