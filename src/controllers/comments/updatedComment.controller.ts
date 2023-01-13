import { Request, Response } from "express";
import { iCommentRequest } from "../../interfaces/comments/commentsInterface";
import updatedCommentService from "../../services/comments/updatedComment.service";

export const updatedCommentController = async (req: Request, res: Response) => {
    const data: iCommentRequest = req.body;
    const recipeId: string = req.params.recipe_id;
    const commentId: string = req.params.comment_id;
    const userId: string = req.userId;
    const updatedComment = await updatedCommentService(
        data,
        recipeId,
        commentId,
        userId
    );
    return res.json(updatedComment);
};
