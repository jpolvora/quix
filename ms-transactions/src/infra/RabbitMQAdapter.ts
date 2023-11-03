import amqp from 'amqplib'
import { Result, IUseCase } from '@/domain/use-cases'

export abstract class RabbitMQAdapter<TInput, TOutput extends Result, UseCase extends IUseCase<TInput, TOutput>> {
  constructor(private readonly useCaseFactory: () => UseCase) {}

  getInput(msg: amqp.ConsumeMessage): TInput | null {
    try {
      const dto = JSON.parse(msg.content.toString()) as TInput
      return dto
    } catch (error) {
      return null
    }
  }

  public getHandler() {
    return this.adapt.bind(this)
  }

  async adapt(msg: amqp.ConsumeMessage): Promise<boolean> {
    try {
      const useCase = this.useCaseFactory()
      const input: TInput = this.getInput(msg) as TInput
      if (!input) return false

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
