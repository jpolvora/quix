import { processAccountCreated, processDeposit } from './actions'
import { makeConsumeAccountCreatedEvent, makeConsumeDepositMadeEvent } from './container'

export function adaptConsumersToUseCases(): void {
  Promise.all([
    makeConsumeAccountCreatedEvent(processAccountCreated).startConsuming(),
    makeConsumeDepositMadeEvent(processDeposit).startConsuming(),
  ])
}
