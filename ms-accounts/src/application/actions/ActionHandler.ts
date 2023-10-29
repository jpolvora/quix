import { createInputFromRequest } from '@/shared/utils/app'
import { IUseCase, Result } from '@/use-cases'
import { DbError, HttpNotFoundError, MissingParamError, ValidationError } from '@/validation/errors'
import { NextFunction, Request, Response } from 'express'

export default abstract class ActionHandler<TInput, TOutput extends Result, UseCase extends IUseCase<TInput, TOutput>> {
  constructor(private readonly useCaseFactory: () => UseCase) {}

  protected getInput(req: Request): TInput {
    const input: TInput = createInputFromRequest<TInput>(req)
    return input
  }

  protected getSuccessStatusCode(): number {
    return 200
  }

  public getHandler() {
    return this.handle.bind(this)
  }

  public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const useCase = this.useCaseFactory()
      const input = this.getInput(req)
      const output = await useCase.execute(input)
      output?.success ? res.status(this.getSuccessStatusCode()).json(output) : this.handleError(output.error, res, next)
    } catch (error) {
      this.handleError(error, res, next)
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
