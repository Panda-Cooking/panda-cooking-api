import AppDataSource from "../../data-source";
import { iCommentRequest } from "../../interfaces/comments/commentsInterface";
import AppError from "../../errors/appError";
import { Comment } from "../../entities/coments.entity";
import { Recipe } from "../../entities/recipes.entity";

const updatedCommentService = async (
    commentData: string,
    comment_id: string,
    recipe_id: string
): Promise<Comment> => {
    try {
        const commentRepository = AppDataSource.getRepository(Comment)
        const recipeRepository = AppDataSource.getRepository(Recipe)

        const findComment = await commentRepository.findOneBy({
            id: comment_id,
          })

        const findRecipe = await recipeRepository.findOneBy({
            id: recipe_id,
          })

          const updatedComment = commentRepository.create({
            ...findComment,
            ...findRecipe,
            description: commentData            
          })

          await commentRepository.save(updatedComment)


        return updatedComment
    } catch (error) {
        throw new AppError("error.message", 404);
    }
};

export default updatedCommentService;
