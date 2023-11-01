import jwt from 'jsonwebtoken'

export {}

declare global {
  namespace Express {
    export interface Request {
      user?: jwt.JwtPayload | string
    }
  }
}
