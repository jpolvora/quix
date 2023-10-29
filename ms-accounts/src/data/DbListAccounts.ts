import { calcSkip } from '@/shared/utils/fns'
import { IListAccounts, ListAccountsInput, ListAccountsOutput } from '@/domain/use-cases'
import AccountsRepository from './DbAccountsRepository'

export default class DbListAccounts implements IListAccounts {
  constructor(private readonly repository: AccountsRepository) {}

  async execute(input: ListAccountsInput): Promise<ListAccountsOutput> {
    const { page, pageSize } = input
    const skip = calcSkip(page, pageSize)
    const total = await this.repository.getTotalAccounts()
    const data = await this.repository.getAccounts(skip, pageSize)

    return {
      total,
      success: true,
      data,
      page,
      pageSize,
    }
  }
}
