import AppDataSource from "../../data-source";
import { Comment } from "../../entities/coments.entity";
import AppError from "../../errors/appError";

const deleteCommentService = async (commentId: string) => {
    const comentaryRepo = AppDataSource.getRepository(Comment);

    const comment = await comentaryRepo.findOneBy({ id: commentId });

    if (!comment) {
        throw new AppError("Comment not found", 404);
    }

    await comentaryRepo.delete({ id: comment.id });

    return 204;
};

export default deleteCommentService;
