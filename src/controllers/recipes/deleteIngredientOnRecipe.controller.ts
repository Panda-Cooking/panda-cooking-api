import { Request, Response } from "express";
import deleteIngredientOnRecipeService from "../../services/recipes/deleteIngredientOnRecipe.service";

export const deleteIngredientOnRecipeController = async (
    req: Request,
    res: Response
) => {
    const data = await deleteIngredientOnRecipeService(
        req.params.recipeId,
        req.params.ingredientId,
        req.userId
    );

    return res.status(204).json(data);
};
