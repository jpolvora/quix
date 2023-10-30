import { AccountTypes, ChangeAccountTypeInput } from '@/domain/use-cases'
import { AccountDTO } from '@/data/AccountDTO'
import { ValidationBase, ValidationResult } from '../'

export class ChangeAccountTypeValidator implements ValidationBase<ChangeAccountTypeInput> {
  constructor(private readonly account: AccountDTO) {}
  validate(input: ChangeAccountTypeInput): ValidationResult {
    if (!input.newAccountType) return ValidationBase.CreateMissingParameterError('newAccountType')

    if (![AccountTypes.Corrente, AccountTypes.Poupança].includes(input.newAccountType)) {
      return ValidationBase.CreateValidationError('account type should be Corrente or Poupança')
    }

    if (input.newAccountType === this.account.account_type) {
      return ValidationBase.CreateValidationError('Target account is already of desired type')
    }

    return ValidationBase.Success()
  }
}
