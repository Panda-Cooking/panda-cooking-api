import { iUserRequest } from "../../interfaces/users/index";
import { Request, Response } from "express";
import createUserService from "../../services/users/createUser.service";

const createUserController = async (request: Request, response: Response) => {
    const userData: iUserRequest = request.body;
    const newUser = await createUserService(userData);
    return response.status(201).json(newUser);
};

export { createUserController };
