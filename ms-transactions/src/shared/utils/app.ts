import { Express, Request } from 'express'
import { Server } from 'http'

export function startApp(app: Express, port: number): Promise<Server> {
  return new Promise((resolve) => {
    let server: Server
    server = app.listen(port, () => resolve(server))
  })
}

export function createInputFromRequest<T>(req: Request) {
  const request = {
    ...(req.body || {}),
    ...(req.params || {}),
  }

  return request as T
}
