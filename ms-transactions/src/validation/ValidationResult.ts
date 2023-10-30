import { ValidationError, MissingParamError } from './errors'

export type ValidationResult = {
  isValid: boolean
  error?: ValidationError | MissingParamError | null
}
