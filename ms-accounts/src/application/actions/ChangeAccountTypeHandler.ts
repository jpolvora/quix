import { ChangeAccountTypeInput, ChangeAccountTypeOutput, IChangeAccountType } from '@/domain/use-cases'
import ActionHandler from './ActionHandler'

export class ChangeAccountTypeHandler extends ActionHandler<
  ChangeAccountTypeInput,
  ChangeAccountTypeOutput,
  IChangeAccountType
> {
  protected getSuccessStatusCode(): number {
    return 204
  }
}
