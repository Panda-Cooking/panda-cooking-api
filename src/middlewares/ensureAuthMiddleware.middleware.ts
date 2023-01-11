import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const ensureAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let userToken = req.headers.authorization
    let userId = ''

    if (!userToken) {
        return res.status(401).json({
            message: 'Invalid token'
        })
    }

    userToken = userToken.split(' ')[1]

    jwt.verify(userToken, process.env.SECRET_KEY!, (error, decoded:any) => {
        if (error) {
            return res.status(401).json({
                message: error.message
            })
        }

        userId = decoded.sub
    })

    req.userId = userId

    return next()
}

export {ensureAuthMiddleware}