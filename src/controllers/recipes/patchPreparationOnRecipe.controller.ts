import { Request, Response } from "express";
import patchPreparationOnRecipeService from "../../services/recipes/patchPreparationOnRecipe.service";

export const patchPreparationOnRecipeController = async (
    req: Request,
    res: Response
) => {
    const data = await patchPreparationOnRecipeService(
        req.params.recipeId,
        req.params.preparationId,
        req.body
    );

    return res.status(200).json(data);
};
