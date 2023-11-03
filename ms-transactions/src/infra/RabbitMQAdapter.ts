import amqp from 'amqplib'
import { Result, IUseCase } from '@/domain/use-cases'

export abstract class RabbitMQAdapter<TInput, TOutput extends Result, UseCase extends IUseCase<TInput, TOutput>> {
  constructor(private readonly useCaseFactory: () => UseCase) {}

  public getHandler() {
    return this.adapt.bind(this)
  }

  async adapt(input: TInput): Promise<boolean> {
    try {
      if (!input) return false
      const useCase = this.useCaseFactory()

      const output: TOutput = await useCase.execute(input)

      if (output.success) return true

      console.log(output.error)

      return false
    } catch (error: any) {
      console.log(error)
      return false
    }
  }
}
