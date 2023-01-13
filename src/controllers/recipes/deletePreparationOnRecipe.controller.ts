import { Request, Response } from "express";
import deletePreparationOnRecipeService from "../../services/recipes/deletePreparationOnRecipe.service";

export const deletePreparationOnRecipeController = async (
    req: Request,
    res: Response
) => {
    const data = await deletePreparationOnRecipeService(
        req.params.recipeId,
        req.params.preparationId,
        req.userId
    );

    return res.status(204).json(data);
};
