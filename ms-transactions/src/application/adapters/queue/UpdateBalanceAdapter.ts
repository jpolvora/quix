export * from '../http/DepositAdapter'

import { IUpdateBalance } from '@/domain/use-cases/IUpdateBalance'
import { RabbitMQAdapter } from '@/infra'
import { Result } from '@/domain/use-cases/types'
import { AccountDTO } from '@/data/dto/AccountDTO'
import { ConsumeMessage } from 'amqplib'

export class UpdateBalanceAdapter extends RabbitMQAdapter<AccountDTO, Result, IUpdateBalance> {}
