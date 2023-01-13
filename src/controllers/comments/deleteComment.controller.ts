import { Request, Response } from "express";
import deleteCommentService from "../../services/comments/deleteComment.service";

const deleteCommentController = async (req: Request, res: Response) => {
    const commentId = req.params.id;
    const userId = req.userId;

    const status = await deleteCommentService(commentId, userId);

    return res.status(status).json();
};

export default deleteCommentController;
