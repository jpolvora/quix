import { IUpdateBalance } from '@/features/update-balance/IUpdateBalance'
import { RabbitMQAdapter } from '@/infra'
import { UpdateBalance } from '.'

export class UpdateBalanceAdapter extends RabbitMQAdapter<UpdateBalance.Input, UpdateBalance.Outpout, IUpdateBalance> {}
