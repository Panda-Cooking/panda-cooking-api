import AppDataSource from "../../data-source";
import { Comment } from "../../entities/coments.entity";
import { Recipe } from "../../entities/recipes.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/appError";
import { iCommentRequest } from "../../interfaces/comments/commentsInterface";

const createCommentService = async (commentData: iCommentRequest) => {
    const commentaryRepo = AppDataSource.getRepository(Comment);
    const userRepo = AppDataSource.getRepository(User);
    const recipeRepo = AppDataSource.getRepository(Recipe);

    const user = await userRepo.findOneBy({id: commentData.userId})
    const recipe = await recipeRepo.findOneBy({id: commentData.recipeId})
    const comment = commentaryRepo.create(commentData)

    if(!user){
        throw new AppError("User does not exists", 404)
    }
    if(!recipe){
        throw new AppError("Recipe does not exists", 404)
    }

    await commentaryRepo.save(comment)

    await commentaryRepo.update({id: comment.id}, {user: user, recipe: recipe})
    
    return comment
};

export default createCommentService;
