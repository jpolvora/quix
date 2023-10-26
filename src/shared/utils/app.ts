import { Express } from 'express'
import { Server } from 'http';

export function startApp(app: Express, port: number): Promise<Server> {

    return new Promise((resolve) => {
        let server: Server;
        server = app.listen(port, () => resolve(server))
    })
}