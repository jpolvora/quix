import { ValidationError, MissingParamError } from './errors'
import Validation from './Validation'
import { ValidationResult } from './ValidationResult'

export abstract class ValidationBase<T> implements Validation<T> {
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

  validate: (input: T) => ValidationResult
}
