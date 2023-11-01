import { IApplication } from '@/shared/types/IApplication'
import { processAccountCreated, processDeposit } from './actions'
import { makeConsumeAccountCreatedEvent, makeConsumeDepositMadeEvent } from './container'

export class RabbitMQApp implements IApplication {
  getApp() {
    throw new Error('Method not implemented.')
  }

  async start(): Promise<void> {
    Promise.all([
      makeConsumeAccountCreatedEvent(processAccountCreated).startConsuming(),
      makeConsumeDepositMadeEvent(processDeposit).startConsuming(),
    ])
  }
}
