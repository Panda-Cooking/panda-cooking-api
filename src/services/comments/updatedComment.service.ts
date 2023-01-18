import AppDataSource from "../../data-source";
import {
    iCommentRequest,
    iCommentUpdated,
} from "../../interfaces/comments/commentsInterface";
import AppError from "../../errors/appError";
import { Comment } from "../../entities/coments.entity";
import { Recipe } from "../../entities/recipes.entity";
import { User } from "../../entities/users.entity";

const updatedCommentService = async (
    commentData: iCommentRequest,
    recipeId: string,
    commentId: string,
    userId: string
): Promise<iCommentUpdated> => {
    const commentRepository = AppDataSource.getRepository(Comment);
    const recipeRepository = AppDataSource.getRepository(Recipe);
    const userRepository = AppDataSource.getRepository(User);

    const commentQueryBuilder = commentRepository.createQueryBuilder("comment");

    const findComment = await commentRepository.findOneBy({
        id: commentId,
    });

    const findRecipe = await recipeRepository.findOneBy({
        id: recipeId,
    });
    if (!findComment) {
        throw new AppError("comment not found", 404);
    }
    if (!findRecipe) {
        throw new AppError("recipe not found", 404);
    }

    if (!findRecipe) {
        throw new AppError("recipe not found", 404);
    }
    
    if (!findComment) {
        throw new AppError("comment not found", 404);
    }

    const findUser = await userRepository.findOne({
        where: {
            id: userId,
        },
        relations: {
            comments: {
                user: true,
            },
        },
    });

    if (!findRecipe) {
        throw new AppError("Recipe not found", 404);
    }

    if (!findComment) {
        throw new AppError("Comment not found", 404);
    }

    if (!findUser) {
        throw new AppError("User not found", 404);
    }

    const commentary = await commentQueryBuilder
        .leftJoinAndSelect("comment.user", "users")
        .leftJoinAndSelect("comment.recipe", "recipes")
        .where("comment.id = :id", { id: commentId })
        .getOne();

    const isAdm = findUser.isAdm;

    if (commentary.user.id !== userId) {
        if (isAdm === false) {
            throw new AppError("Missing admin permissions", 403);
        }
    }

    try {
        await commentRepository.update(
            { id: commentId },
            {
                description: commentData.description,
            }
        );

        const commentReturn = await commentQueryBuilder
            .leftJoinAndSelect("comment.user", "user")
            .leftJoinAndSelect("comment.recipe", "recipe")
            .select([
                "comment",
                "user.id",
                "user.name",
                "user.email",
                "user.imageProfile",
                "user.isAdm",
                "recipe",
            ])
            .where("comment.id = :id", { id: commentId })
            .getOne();

        return commentReturn;
    } catch (error) {
        throw new AppError(error.message, 404);
    }
};

export default updatedCommentService;
