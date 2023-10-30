import { ICreateAccount } from '@/domain/use-cases/ICreateAccount'
import { DbError } from '@/validation/errors/DbError'
import { CreateAccountValidator } from '@/validation/validators/CreateAccountValidator'
import { AccountsRepository } from './DbAccountsRepository'
import { CreateAccountInput, CreateAccountOuput } from '@/domain/use-cases'
import { ValidationError } from '@/validation/errors/ValidationError'
import { AccountPublisher } from './AccountPublisher'

export class DbCreateAccount implements ICreateAccount {
  constructor(
    private readonly repository: AccountsRepository,
    private readonly publisher: AccountPublisher,
  ) {}

  async execute(input: CreateAccountInput): Promise<CreateAccountOuput> {
    const validationResult = new CreateAccountValidator().validate(input)

    if (!validationResult.isValid) {
      return {
        statusCode: 201,
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
          statusCode: 400,
          success: false,
          error: new ValidationError('Existing account'),
        }
      }

      const data = await this.repository.createAccount({
        id,
        account_type: accountType,
      })

      await this.publisher.publishAccountCreated(account)

      return {
        statusCode: 201,
        success: true,
        data: data,
      }
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        error: new DbError(error),
      }
    }
  }
}
