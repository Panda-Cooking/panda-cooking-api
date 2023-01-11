import { Request, Response } from "express";
import { iCommentRequest } from "../../interfaces/comments/commentsInterface";
import createCommentService from "../../services/comments/createComment.service";
import listCommentsService from "../../services/comments/listComments.service";
import updatedCommentService from "../../services/comments/updatedComment.service";

const createCommentController = async (req: Request, res: Response) => {
    const commentData: iCommentRequest = req.body;
    const newComment = await createCommentService(commentData);

    return res.status(201).json(newComment);
};

export const updatedCommentController = async (req: Request, res: Response) => {
    const data = req.body;
    const recipeId = req.params.recipe_id;
    const commentId = req.params.comment_id;
    const updatedComment = await updatedCommentService(
        data,
        recipeId,
        commentId
    );
    return res.json(updatedComment);
};

export const listCommentsController = async (req: Request, resp: Response) => {
    const users = await listCommentsService();
    return resp.json(users);
};

export default createCommentController;
