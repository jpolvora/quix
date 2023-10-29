import { ICreateAccount } from '@/use-cases/ICreateAccount'
import { DbError } from '@/validation/errors/DbError'
import { CreateAccountValidator } from '@/validation/validators/CreateAccountValidator'
import AccountsRepository from './DbAccountsRepository'
import { CreateAccountInput, CreateAccountOuput } from '@/use-cases'
import { ValidationError } from '@/validation/errors/ValidationError'

export default class DbCreateAccount implements ICreateAccount {
  constructor(private readonly repository: AccountsRepository) {}

  async execute(input: CreateAccountInput): Promise<CreateAccountOuput> {
    const validationResult = new CreateAccountValidator().validate(input)

    if (!validationResult.isValid) {
      return {
        success: false,
        error: validationResult.error,
      }
    }

    const { id, accountType } = input

    try {
      //check existing account
      const account = await this.repository.getAccount(id)
      if (account) {
        return {
          success: false,
          error: new ValidationError('Existing account'),
        }
      }

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
