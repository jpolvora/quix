import { Express } from 'express'

export type MicroServiceEntryPoint = () => Promise<Express>
