import { createInputFromRequest } from '@/shared/utils/app'
import { HttpResult, IUseCase, Result } from '@/domain/use-cases'
import { DbError, EntityNotFoundError, MissingParamError, ValidationError } from '@/validation/errors'
import { NextFunction, Request, Response } from 'express'

export default abstract class ActionHandler<
  TInput,
  TOutput extends HttpResult,
  UseCase extends IUseCase<TInput, TOutput>,
> {
  constructor(private readonly useCaseFactory: () => UseCase) {}

  protected getInput(req: Request): TInput {
    const input: TInput = createInputFromRequest<TInput>(req)
    return input
  }

  public getHandler() {
    return this.handle.bind(this)
  }

  public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const useCase = this.useCaseFactory()
      const input = this.getInput(req)
      const output: TOutput = await useCase.execute(input)

      if (output.success) {
        //log
        res.status(output.statusCode).json(output)
      } else {
        //log
        this.handleError(output.statusCode, output.error, res, next)
      }
    } catch (error) {
      this.handleError(500, error, res, next)
    }
  }

  private handleError(statusCode: number, error: Error, res: Response, next: NextFunction) {
    if (!error) return next(new Error('unknow error'))

    console.log(error)

    const extraInfo = {
      handled: true,
      env: process.env.NODE_ENV,
      errorDetails: {
        message: process.env.NODE_ENV !== 'production' ? error.message : '',
        stack: error.stack,
      },
    }

    if (error instanceof EntityNotFoundError) {
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
