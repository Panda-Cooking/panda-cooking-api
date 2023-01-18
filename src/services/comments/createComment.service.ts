import AppDataSource from "../../data-source";
import { Comment } from "../../entities/coments.entity";
import { Recipe } from "../../entities/recipes.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/appError";
import {
    iCommentRequest,
    iCommentResponse,
} from "../../interfaces/comments/commentsInterface";

const createCommentService = async (
    commentData: iCommentRequest
): Promise<iCommentResponse> => {
    const commentaryRepo = AppDataSource.getRepository(Comment);
    const userRepo = AppDataSource.getRepository(User);
    const recipeRepo = AppDataSource.getRepository(Recipe);

    const user = await userRepo.findOneBy({ id: commentData.userId });
    const recipe = await recipeRepo.findOneBy({ id: commentData.recipeId });
    const comment = commentaryRepo.create(commentData);

    if (!user) {
        throw new AppError("User does not exists", 404);
    }
    if (!recipe) {
        throw new AppError("Recipe does not exists", 404);
    }

    await commentaryRepo.save(comment);

    await commentaryRepo.update(
        { id: comment.id },
        { user: user, recipe: recipe }
    );

    const commentQueryBuilder = commentaryRepo.createQueryBuilder("comment");


    const commentReturn = await commentQueryBuilder
    .leftJoinAndSelect("comment.user", "user")
    .leftJoinAndSelect("comment.recipe", "recipe")
    .select([
        "comment",
        "user.id",
        "user.name",
        "user.email",
        "user.imageProfile",
        "recipe"
])
    .where("comment.id = :id", { id: comment.id })
    .getOne();


    return commentReturn;
};

export default createCommentService;
