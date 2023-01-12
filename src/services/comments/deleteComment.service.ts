import AppDataSource from "../../data-source";
import { Comment } from "../../entities/coments.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/appError";

const deleteCommentService = async (
    commentId: string,
    userId: string
): Promise<number> => {
    const comentaryRepo = AppDataSource.getRepository(Comment);
    const userRepo = AppDataSource.getRepository(User);

    const comment = await comentaryRepo.findOneBy({ id: commentId });
    const user = await userRepo.findOneBy({ id: userId });

    if (!comment) {
        throw new AppError("Comment not found", 404);
    }

    const commentQueryBuilder = comentaryRepo.createQueryBuilder("comment");

    const commentary = await commentQueryBuilder
        .leftJoinAndSelect("comment.user", "user")
        .leftJoinAndSelect("comment.recipe", "recipe")
        .where("comment.id = :id", { id: commentId })
        .getOne();

    if (commentary.user.id !== userId) {
        if (user.isAdm === false) {
            throw new AppError("Missing admin permissions", 403);
        }
    }

    await comentaryRepo.delete({ id: comment.id });

    return 204;
};

export default deleteCommentService;
