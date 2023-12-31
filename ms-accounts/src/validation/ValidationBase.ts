import IValidation from './IValidation'
import { ValidationResult } from './ValidationResult'
import { ValidationError, MissingParamError } from './errors'

export abstract class ValidationBase<T> implements IValidation<T> {
  static CreateMissingParameterError(parameterName: string): ValidationResult {
    return {
      error: new MissingParamError(parameterName),
      isValid: false,
    }
  }

  static CreateValidationError(message: string): ValidationResult {
    return {
      error: new ValidationError(message),
      isValid: false,
    }
  }

  static Success(): ValidationResult {
    return {
      isValid: true,
    }
  }

  validate: (input: T) => ValidationResult
}
