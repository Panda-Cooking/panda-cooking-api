import { Request, Response } from "express";
import deleteImageOnRecipeService from "../../services/recipes/deleteImageOnRecipe.service";

export const deleteImageOnRecipeController = async (
    req: Request,
    res: Response
) => {
    const data = await deleteImageOnRecipeService(
        req.params.recipeId,
        req.params.imageRecipeId,
        req.userId
    );

    return res.status(204).json(data);
};
