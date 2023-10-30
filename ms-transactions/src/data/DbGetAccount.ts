import { GetAccountInput, GetAccountOutput } from '@/domain/use-cases'
import { IGetAccount } from '@/domain/use-cases/IGetAccount'
import { AccountsRepository } from './AccountsRepository'
import { DbError } from '@/validation/errors/DbError'
import { EntityNotFoundError } from '@/validation/errors'

export class DbGetAccount implements IGetAccount {
  constructor(private readonly repository: AccountsRepository) {}

  async execute(id: GetAccountInput): Promise<GetAccountOutput> {
    try {
      const account = await this.repository.getAccount(id)

      if (!account)
        return {
          statusCode: 404,
          success: false,
          error: new EntityNotFoundError(),
        }
      return {
        statusCode: 200,
        success: true,
        data: account,
      }
    } catch (er) {
      return {
        statusCode: 500,
        success: false,
        error: new DbError(er),
      }
    }
  }
}
