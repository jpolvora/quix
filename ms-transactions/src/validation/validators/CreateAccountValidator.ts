import { AccountTypes, CreateAccountInput } from '@/domain/use-cases'
import { ValidationResult } from '../ValidationResult'
import { ValidationBase } from '../ValidationBase'

export class CreateAccountValidator implements ValidationBase<CreateAccountInput> {
  validate(input: CreateAccountInput): ValidationResult {
    if (!input.id) return ValidationBase.CreateMissingParameterError('id')

    if (!input.id.length || input.id.length !== 36)
      return ValidationBase.CreateValidationError('id must be a string with length of 36')

    if (!input.accountType) return ValidationBase.CreateValidationError('account type')

    if (![AccountTypes.Corrente, AccountTypes.Poupança].includes(input.accountType)) {
      return ValidationBase.CreateValidationError('account type should be Corrente or Poupança')
    }
    return ValidationBase.Success()
  }
}
