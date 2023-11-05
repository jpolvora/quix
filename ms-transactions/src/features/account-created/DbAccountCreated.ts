import { AccountCreated, IAccountCreated } from '@/features/account-created'
import { IAccountRepository } from '@/domain/repository/IAccountRepository'
import { DbError } from '@/validation/errors'

export class DbAccountCreated implements IAccountCreated {
  constructor(private readonly accountsRepository: IAccountRepository) {}

  async execute(input: AccountCreated.Input): Promise<AccountCreated.Output> {
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
