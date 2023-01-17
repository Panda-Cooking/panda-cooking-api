import { NextFunction, Request, Response } from "express";
import { Recipe } from "../entities/recipes.entity";
import AppDataSource from "../data-source";

const verifyUserIsAuthorOnRecipeMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const recipeId: string = req.params.recipeId;
    const userId: string = req.userId;

    const recipeRepo = AppDataSource.getRepository(Recipe);

    const findRecipe = await recipeRepo.findOne({
        where: {
            id: recipeId,
        },
        relations: {
            user: true,
        },
    });

    if (findRecipe.user.id !== userId) {
        return res.status(403).json({
            message: "User is not author on recipe",
        });
    }

    next();
};

export default verifyUserIsAuthorOnRecipeMiddleware;
