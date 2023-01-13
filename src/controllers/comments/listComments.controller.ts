import { Request, Response } from "express";
import listCommentsService from "../../services/comments/listComments.service";

export const listCommentsController = async (req: Request, resp: Response) => {
    const users = await listCommentsService();
    return resp.json(users);
};
