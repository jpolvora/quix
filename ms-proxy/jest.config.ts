import type { Config } from '@jest/types';


process.env['DATABASE_URL'] = "postgresql://postgres:pgsql@localhost:5432/quix-accounts?schema=public";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  // setupFilesAfterEnv: ['./tests/bootstrap.ts']
};
export default config;