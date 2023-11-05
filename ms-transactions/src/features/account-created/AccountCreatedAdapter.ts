import { AccountCreated, IAccountCreated } from '@/features/account-created'
import { RabbitMQAdapter } from '@/infra'

export class AccountCreatedAdapter extends RabbitMQAdapter<
  AccountCreated.Input,
  AccountCreated.Output,
  IAccountCreated
> {}
