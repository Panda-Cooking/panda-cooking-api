import { Request, Response } from "express";
import { iUserUpdate } from "../../interfaces/users";
import { patchUserService } from "../../services/users/patchUserService.service";

export const patchUserController = async (req: Request, res: Response) => {
    const userData: iUserUpdate = req.body;
    const userId: string = req.userId;
    const patchedUser = await patchUserService(userId, userData);
    return res.json(patchedUser);
};
