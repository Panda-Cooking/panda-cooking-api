import { Request ,Response } from "express";
import { deleteUserService } from "../../services/admin/deleteUser.service";

export const deleteUserController = async (req: Request, res: Response) => {
    const userId: string = req.body.userId
    const deleteUser: object = await deleteUserService(userId)
    return res.json(deleteUser)
}