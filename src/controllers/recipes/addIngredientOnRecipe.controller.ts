import { Request, Response } from "express";
import addIngredientOnRecipeService from "../../services/recipes/addIngredientOnRecipe.service";

export const addIngredientOnRecipeController = async (
    req: Request,
    res: Response
) => {
    const data = await addIngredientOnRecipeService(
        req.body.ingredients,
        req.params.recipeId,
        req.userId
    );

    return res.status(201).json(data);
};
