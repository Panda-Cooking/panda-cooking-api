import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";

const deleteUserController = async (request: Request, response: Response) => {
    const userId = request.params.id;
    await deleteUserService(userId);
    return response.status(204).json({ message: "User deleted!" });
};

export { deleteUserController };
