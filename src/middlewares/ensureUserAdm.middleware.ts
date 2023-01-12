import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";

const ensureUserAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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

    const userRepo = AppDataSource.getRepository(User)
    const user = await userRepo.findOneBy({id: userId})

    if(!user.isAdm) {
        return res.status(401).json({
            message: 'You are not authorized to do this action'
        })
    }

    return next()
}

export {ensureUserAdmMiddleware}