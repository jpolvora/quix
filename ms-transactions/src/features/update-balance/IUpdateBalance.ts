import { IUseCase } from '../../domain/use-cases/types'
import { UpdateBalance } from '.'

export interface IUpdateBalance extends IUseCase<UpdateBalance.Input, UpdateBalance.Outpout> {}
