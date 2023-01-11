import { Request, Response } from "express";
import updatedCommentService from "../services/comments/updatedComment.service";

export const updatedCommentController = async (req: Request, res: Response) => {
    const data = req.body;
    const recipe_id = req.params.recipe_id;
    const comment_id = req.params.comment_id;
    console.log(recipe_id);
    console.log(comment_id);
    console.log(req.body);
    return res.json();
};
