import { ChangeAccountTypeInput } from '@/use-cases'
import { ValidationResult } from '../ValidationResult'
import { ValidationBase } from '../ValidationBase'

export class ChangeAccountTypeValidator implements ValidationBase<ChangeAccountTypeInput> {
  validate(input: ChangeAccountTypeInput): ValidationResult {
    if (!input.newAccountType) return ValidationBase.CreateMissingParameterError('newAccountType')

    if (!['Corrente', 'Poupança'].includes(input.newAccountType))
      return ValidationBase.CreateValidationError('account type should be Corrente or Poupança')

    return ValidationBase.Success()
  }
}
