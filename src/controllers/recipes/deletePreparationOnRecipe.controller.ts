import { Request, Response } from "express";
import deletePreparationOnRecipeService from "../../services/recipes/deletePreparationOnRecipe.service";

export const deletePreparationOnRecipeController = async (
    req: Request,
    res: Response
) => {
    const data = await deletePreparationOnRecipeService(
        req.params.recipeId,
        req.params.preparationId
    );

    return res.status(204).json(data);
};
