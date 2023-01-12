import AppDataSource from "../../data-source";
import { iCommentRequest, iCommentUpdated } from "../../interfaces/comments/commentsInterface";
import AppError from "../../errors/appError";
import { Comment } from "../../entities/coments.entity";
import { Recipe } from "../../entities/recipes.entity";
import { User } from "../../entities/users.entity";
import { commentsUpdated } from "../../schemas/comments/comments.schema";

const updatedCommentService = async (
  commentData: iCommentRequest,
  recipeId: string,
  commentId: string,
  userId: string,
): Promise<iCommentUpdated> => {
    try {
        const commentRepository = AppDataSource.getRepository(Comment);
        const recipeRepository = AppDataSource.getRepository(Recipe);
        const userRepository = AppDataSource.getRepository(User);

        const findComment = await commentRepository.findOneBy({
            id: commentId,
        });

        const findRecipe = await recipeRepository.findOneBy({
            id: recipeId,
        });

        const findUser = await userRepository.findOneBy({
            id: userId,
        });

        console.log(commentData)

        const updatedComment = await commentRepository.save({
            id: findComment.id,
            user:findUser,
            recipe: findRecipe,
            description: commentData.description,
        });

        const updatedComments = await commentsUpdated.validate(
          updatedComment,
          {
            stripUnknown: true,
          }
        )

        return updatedComments;
    } catch (error) {
        throw new AppError(error.message, 404);
    }
};

export default updatedCommentService;
