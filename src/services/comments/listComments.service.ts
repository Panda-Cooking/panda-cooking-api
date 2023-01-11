import AppDataSource from "../../data-source";
import { Comment } from "../../entities/coments.entity";
import AppError from "../../errors/appError";

const listCommentsService = async (): Promise<Comment[]> => {
    try {
        const commentRepository = AppDataSource.getRepository(Comment);
        const comments = await commentRepository.find();
        return comments;
    } catch (error) {
        throw new AppError(error.message, 404);
    }
};

export default listCommentsService;
