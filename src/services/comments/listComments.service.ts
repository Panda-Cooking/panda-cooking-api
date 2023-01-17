import AppDataSource from "../../data-source";
import { Comment } from "../../entities/coments.entity";
import AppError from "../../errors/appError";

const listCommentsService = async (): Promise<Comment[]> => {
    try {
        const commentRepository = AppDataSource.getRepository(Comment);

        const comments = await commentRepository
            .createQueryBuilder("comments")
            .innerJoinAndSelect("comments.user", "user")
            .leftJoinAndSelect("comments.recipe", "recipe")
            .select([
                "comments",
                "user.id",
                "user.name",
                "user.email",
                "user.imageProfile",
                "user.isAdm",
                "recipe"
            ]).
        getMany();

        return comments;
    } catch (error) {
        throw new AppError(error.message, 404);
    }
};

export default listCommentsService;
