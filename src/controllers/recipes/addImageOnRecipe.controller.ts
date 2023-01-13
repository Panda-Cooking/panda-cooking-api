import { Request, Response } from "express";
import addImageOnRecipeService from "../../services/recipes/addImageOnRecipe.service";

export const addImageOnRecipeController = async (
    req: Request,
    res: Response
) => {
    const data = await addImageOnRecipeService(
        req.body,
        req.params.recipeId,
        req.userId
    );

    return res.status(201).json(data);
};
