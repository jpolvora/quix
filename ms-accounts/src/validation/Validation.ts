import { ValidationResult } from './ValidationResult'

export default interface Validation<T> {
  validate: (input: T) => ValidationResult
}
