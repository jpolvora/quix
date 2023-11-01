import IValidation from './IValidation'
import { ValidationResult } from './ValidationResult'
import { ValidationError, MissingParamError } from './errors'

export abstract class ValidationBase<T> implements IValidation<T> {
  validate(input: T): ValidationResult {
    return {
      isValid: false,
      error: new ValidationError('not implemented'),
    }
  }
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
}
