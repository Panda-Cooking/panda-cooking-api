import { Request, Response, NextFunction } from "express";
import AppError from "../errors/appError";

const ensurePatchDataStructure = (req: Request, res:Response, next:NextFunction) => {
    const patchContent = req.body

    if('isAdm' in patchContent || 'id' in patchContent) {
        throw new AppError('The following settings cant be modified: -isAdm- and -id-', 401)
    };

    return next()
}

export default ensurePatchDataStructure