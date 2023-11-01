import { ValidationResult } from './ValidationResult'

export default interface IValidation<T> {
  validate(input: T): ValidationResult
}
