import { Request, Response } from "express";
import patchImageRecipeService from "../../services/recipes/patchImageRecipe.service";

export const patchImageRecipeController = async (
    req: Request,
    res: Response
) => {
    console.log(req.params);
    const data = await patchImageRecipeService(
        req.params.recipeId,
        req.params.imageRecipeId,
        req.body
    );

    return res.status(200).json(data);
};
