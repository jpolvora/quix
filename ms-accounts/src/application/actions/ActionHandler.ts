import { IUseCase, Result } from '@/use-cases'
import { DbError, HttpNotFoundError, MissingParamError, ValidationError } from '@/validation/errors'
import { NextFunction, Request, Response } from 'express'

type ExpressMiddleware = {
  req: Request
  res: Response
  next: NextFunction
}

export default class ActionHandler<TInput, TOutput extends Result, UseCase extends IUseCase<TInput, TOutput>> {
  private readonly req: Request
  private readonly res: Response<any, Record<string, any>>
  private readonly next: NextFunction

  constructor(
    private readonly useCaseFactory: () => UseCase,
    middleware: ExpressMiddleware,
  ) {
    this.req = middleware.req
    this.res = middleware.res
    this.next = middleware.next
  }

  async handle(input: TInput, statusCode: number = 200): Promise<any> {
    try {
      const useCase = this.useCaseFactory()
      const output = await useCase.execute(input)
      output?.success ? this.res.status(statusCode).json(output) : this.handleError(output.error, this.res, this.next)
    } catch (error) {
      this.handleError(error, this.res, this.next)
    }
  }

  private handleError(error: Error, res: Response, next: NextFunction) {
    if (!error) return next(new Error('unknow error'))

    const extraInfo = {
      handled: true,
      env: process.env.NODE_ENV,
      errorDetails: {
        message: process.env.NODE_ENV !== 'production' ? error.message : '',
        stack: error.stack,
      },
    }

    if (error instanceof HttpNotFoundError) {
      return res.status(404).json({
        succces: false,
        error: error.name,
        status: 404,
        ...extraInfo,
      })
    }

    if (error instanceof DbError) {
      return res.status(500).json({
        succces: false,
        error: error.name,
        status: 500,
        ...extraInfo,
      })
    }

    if (error instanceof ValidationError || error instanceof MissingParamError) {
      return res.status(400).json({
        succces: false,
        error: error.name,
        status: 400,
        ...extraInfo,
      })
    }

    return next(error)
  }
}
