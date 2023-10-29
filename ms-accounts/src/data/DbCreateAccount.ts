import { AccountOutput, ICreateAccount } from '@/use-cases/ICreateAccount'
import { DbError } from '@/validation/DbError'
import { CreateAccountValidator } from '@/validation/CreateAccountValidator'
import AccountsRepository from './DbAccountsRepository'

export default class DbCreateAccount implements ICreateAccount {
  constructor(private readonly repository: AccountsRepository) {}

  async execute(id: string, accountType: string): Promise<AccountOutput> {
    const validator = new CreateAccountValidator()
    const hasValidationError = validator.validate({
      id,
      accountType,
    })

    if (hasValidationError)
      return {
        success: false,
        error: hasValidationError,
      }

    try {
      const data = await this.repository.createAccount({
        id,
        account_type: accountType,
      })

      return {
        success: true,
        data: data,
      }
    } catch (error) {
      return {
        success: false,
        error: new DbError(error),
      }
    }
  }
}
