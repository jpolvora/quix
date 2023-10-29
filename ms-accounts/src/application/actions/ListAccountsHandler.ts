import { ListAccountsInput, ListAccountsOutput, IListAccounts } from '@/use-cases'
import ActionHandler from './ActionHandler'
import { Request } from 'express'

export class ListAccountsHandler extends ActionHandler<ListAccountsInput, ListAccountsOutput, IListAccounts> {
  getInput(req: Request): ListAccountsInput {
    const page = Number(req.query['page']) || 1
    const pageSize = Number(req.query['pageSize']) || 20
    return {
      page,
      pageSize,
    }
  }
}
