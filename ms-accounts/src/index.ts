import { config } from 'dotenv'
import 'module-alias/register'
import { Command } from 'commander';
import { startApp } from '@/shared/utils/app';
import { setupApp } from '@/app';

async function start() {

    const env = config();
    console.log(env)

    const options = new Command()
        .option('-p, --port [VALUE]', 'http port', process.env.PORT || "3000")
        .option('-e, --env [VALUE]', 'environment', process.env.NODE_ENV || "develop")
        .parse(process.argv)
        .opts();

    const port = Number(options.port || process.env.PORT);

    if (!port) throw new Error("Invalid port")

    const app = await setupApp();
    await startApp(app, port);

    if (process.send) process.send('ready') //pm2

    console.log("ms-account started at port %s", port)
}


start().catch(console.error.bind(console))