import { ChangeAccountTypeInput, ChangeAccountTypeOutput, IChangeAccountType } from '@/use-cases'
import ActionHandler from './ActionHandler'

export class ChangeAccountTypeHandler extends ActionHandler<
  ChangeAccountTypeInput,
  ChangeAccountTypeOutput,
  IChangeAccountType
> {}
