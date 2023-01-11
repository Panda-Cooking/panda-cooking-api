import AppDataSource from "../../data-source";
import { iCommentRequest } from "../../interfaces/comments/commentsInterface";
import AppError from "../../errors/appError";

const updatedCommentService = async (
    commentData: string,
    commentId: string
): Promise<iCommentRequest> => {
    try {
        return { description: "sou um comentario" };
    } catch (error) {
        throw new AppError("error.message", 404);
    }
};

export default updatedCommentService;
