import { IAccountCreated } from '@/domain/use-cases/IAccountCreated'
import { AccountDTO } from '../dto/AccountDTO'
import { IAccountRepository } from '@/domain/repository'
import { Result } from '@/domain/use-cases'
import { DbError } from '@/validation/errors'

export class DbAccountCreated implements IAccountCreated {
  constructor(private readonly accountsRepository: IAccountRepository) {}

  async execute(input: AccountDTO): Promise<Result> {
    await this.accountsRepository.createAccount(input)

    return {
      success: true,
    }
  }
  catch(error: any) {
    return {
      success: false,
      error: new DbError(error!.toString()),
    }
  }
}
