import { ChangeAccountTypeInput, HttpResult, IChangeAccountType, Result } from '@/domain/use-cases'
import { AccountsRepository } from './DbAccountsRepository'
import { DbError, EntityNotFoundError } from '@/validation/errors'
import { ChangeAccountTypeValidator } from '@/validation/validators/ChangeAccountTypeValidator'
import { AccountPublisher } from './AccountPublisher'

export class DbChangeAccountType implements IChangeAccountType {
  constructor(
    private readonly repository: AccountsRepository,
    private readonly publisher: AccountPublisher,
  ) {}

  async execute(input: ChangeAccountTypeInput): Promise<HttpResult> {
    //validacoes etc
    var account = await this.repository.getAccount(input.accountId)
    if (!account) {
      return {
        statusCode: 404,
        success: false,
        error: new EntityNotFoundError(),
      }
    }

    const validationResult = new ChangeAccountTypeValidator(account).validate(input)

    if (!validationResult.isValid) {
      return {
        statusCode: 400,
        success: false,
        error: validationResult.error,
      }
    }

    account.account_type = input.newAccountType

    try {
      await this.repository.save(account)

      await this.publisher.publishAccountTypeChanged(account)

      return {
        statusCode: 204,
        success: true,
        error: undefined,
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
