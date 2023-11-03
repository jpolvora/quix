import { IApplication } from '@/shared/types/IApplication'
import { RabbitMQAdapter, RabbitMQConnection, RabbitMQConsumer } from '@/infra'
import { env } from './config/env'
import { AccountCreatedAdapter, UpdateBalanceAdapter } from './adapters'
import { AccountsRepository, DbUpdateBalance, TransactionPublisher, TransactionRepository } from '@/data'
import { prisma } from '@/infra/prisma-client'
import { makeUpdateBalanceAdapter } from './container'

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
    this.queuesConsuming.push(makeUpdateBalanceAdapter())
    //this.queuesConsuming.push(makeConsumeDepositMadeEvent())

    await Promise.all(this.queuesConsuming.map((q) => q.startConsuming()))
  }
}
