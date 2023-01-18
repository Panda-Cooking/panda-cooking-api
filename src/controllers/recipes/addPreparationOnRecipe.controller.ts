import { Request, Response } from "express";
import addPreparationOnRecipeService from "../../services/recipes/addPreparationOnRecipe.service";

export const addPreparationOnRecipeController = async (
    req: Request,
    res: Response
) => {
    const data = await addPreparationOnRecipeService(
        req.params.recipeId,
        req.body
    );

    return res.status(201).json(data);
};
