import jwt from "jsonwebtoken"

import { Request, Response, NextFunction } from 'express'
const accessTokenSecret = '269e50c1-37da-4cc7-84ff-69497a9dc677';

export function createAccessToken(user: {
    id: string,
    name: string,
    role: string
}) {
    const accessToken = jwt.sign(user, accessTokenSecret);
    return accessToken
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    try {
        if (authHeader) {
            const token = authHeader.split(' ')[1];

            const user = jwt.verify(token, accessTokenSecret);
            req["user"] = user
            return next()
        }
    } catch (err) {
        return next(err)
    }

    next()
}
