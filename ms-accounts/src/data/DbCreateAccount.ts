import { ICreateAccount } from '@/use-cases/ICreateAccount'
import { DbError } from '@/validation/DbError'
import { CreateAccountValidator } from '@/validation/CreateAccountValidator'
import AccountsRepository from './DbAccountsRepository'
import { CreateAccountInput, CreateAccountOuput } from '@/use-cases'
import { ValidationError } from '@/validation/ValidationError'

export default class DbCreateAccount implements ICreateAccount {
  constructor(private readonly repository: AccountsRepository) {}

  async execute(input: CreateAccountInput): Promise<CreateAccountOuput> {
    const { id, accountType } = input

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
      //check existing account
      const account = await this.repository.getAccount(id)
      if (account) throw new DbError('Existing account')

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
        error: new ValidationError(error),
      }
    }
  }
}
