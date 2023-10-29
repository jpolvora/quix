import { NextFunction, Request, Response } from 'express'

export class ExpressAdapter<T = any> {
  constructor() {}

  adapt(req: Request, res: Response, next: NextFunction) {
    return () => {}
  }
}
