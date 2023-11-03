import { AccountDTO } from '@/data/dto/AccountDTO'
import { IAccountCreated } from '@/domain/use-cases/IAccountCreated'
import { Result } from '@/domain/use-cases/types'
import { RabbitMQAdapter } from '@/infra'

export class AccountCreatedAdapter extends RabbitMQAdapter<AccountDTO, Result, IAccountCreated> {}
