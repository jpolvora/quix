import 'dotenv/config'
import { Command } from 'commander';
import { initAccountMicroservice } from "./app-accounts"
import { initTransactionsMicroservice } from './app-transactions';
import { MicroServiceEntryPoint } from "./shared/types/MicroServiceEntryPoint";
import { startApp } from './shared/utils/app';

async function start() {

  const options = new Command()
    .option('-m, --micro-service <TYPE>', 'microservice to run')
    .option('-e, --env [VALUE]', 'environment', process.env.NODE_ENV || "develop")
    .parse(process.argv)
    .opts();

  const microServicesToStart: MicroServiceEntryPoint[] = [];

  switch (options.microService) {
    case "app-account": {
      microServicesToStart.push(initAccountMicroservice);
      break;
    }
    case "app-transactions": {
      microServicesToStart.push(initTransactionsMicroservice);
      break;
    }
    default: break;
  }

  if (microServicesToStart.length === 0) throw new Error("no microservice to execute")

  const port = Number(process.env.PORT);

  if (!port) throw new Error("Invalid port")

  for (let microServiceFn of microServicesToStart) {
    const app = await microServiceFn();
    const server = await startApp(app, port);
    //console.log(server)
    console.log(`microservice process '%s': started on port ${port}`, options.microService)
  }
  if (process.send) process.send('ready') //pm2
}


start().catch(console.error.bind(console))