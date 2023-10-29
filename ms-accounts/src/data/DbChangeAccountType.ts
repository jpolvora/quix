import { ChangeAccountTypeInput, IChangeAccountType, Result } from '@/use-cases'
import AccountsRepository from './DbAccountsRepository'
import { DbError, HttpNotFoundError } from '@/validation/errors'
import { ChangeAccountTypeValidator } from '@/validation/validators/ChangeAccountTypeValidator'

export default class DbChangeAccountType implements IChangeAccountType {
  constructor(private readonly repository: AccountsRepository) {}
  async execute(input: ChangeAccountTypeInput): Promise<Result> {
    //validacoes etc
    var account = await this.repository.getAccount(input.accountId)
    if (!account) {
      return {
        success: false,
        error: new HttpNotFoundError(),
      }
    }

    const validationResult = new ChangeAccountTypeValidator().validate(input)

    if (!validationResult.isValid) {
      return {
        success: false,
        error: validationResult.error,
      }
    }

    account.account_type = input.newAccountType

    try {
      await this.repository.save(account)

      return {
        success: true,
        error: undefined,
      }
    } catch (error) {
      return {
        success: false,
        error: new DbError(error),
      }
    }
  }
}
