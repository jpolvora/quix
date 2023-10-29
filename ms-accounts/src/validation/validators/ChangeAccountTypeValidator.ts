import { ChangeAccountTypeInput } from '@/domain/use-cases'
import { ValidationResult } from '../ValidationResult'
import { ValidationBase } from '../ValidationBase'
import { AccountDTO } from '@/data/AccountDTO'

export class ChangeAccountTypeValidator implements ValidationBase<ChangeAccountTypeInput> {
  constructor(private readonly account: AccountDTO) {}
  validate(input: ChangeAccountTypeInput): ValidationResult {
    if (!input.newAccountType) return ValidationBase.CreateMissingParameterError('newAccountType')

    if (!['Corrente', 'Poupança'].includes(input.newAccountType)) {
      return ValidationBase.CreateValidationError('account type should be Corrente or Poupança')
    }

    if (input.newAccountType === this.account.account_type) {
      return ValidationBase.CreateValidationError('Target account is already of desired type')
    }

    return ValidationBase.Success()
  }
}
