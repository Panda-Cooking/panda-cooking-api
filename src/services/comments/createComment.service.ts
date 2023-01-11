import AppDataSource from "../../data-source";
import { Recipe } from "../../entities/recipes.entity";
import { User } from "../../entities/users.entity";
import { iCommentRequest } from "../../interfaces/comments/commentsInterface";

const createCommentService = async (
    commentData: iCommentRequest
): Promise<iCommentRequest> => {
    const commentaryRepo = AppDataSource.getRepository(Comment);
    const userRepo = AppDataSource.getRepository(User);
    const recipeRepo = AppDataSource.getRepository(Recipe);

    const user = await userRepo.findOneBy({ id: commentData.userId });
    const recipe = await recipeRepo.findOneBy({ id: commentData.recipeId });
    const comment = await commentaryRepo.create(commentData.description);

    return { description: "1", userId: "a", recipeId: "1" };
};

export default createCommentService;
