export interface IApplication<T = any> {
  getApp(): T
  start(): Promise<void>
  stop(): Promise<void>
}
