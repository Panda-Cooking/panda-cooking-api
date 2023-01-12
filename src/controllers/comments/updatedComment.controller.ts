import { Request, Response } from "express";
import updatedCommentService from "../../services/comments/updatedComment.service";

export const updatedCommentController = async (req: Request, res: Response) => {
    const data: string = req.body;
    const recipeId: string = req.params.recipe_id;
    const commentId: string = req.params.comment_id;
    const updatedComment = await updatedCommentService(
        data,
        recipeId,
        commentId
    );
    return res.json(updatedComment);
};
