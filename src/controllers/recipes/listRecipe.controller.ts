import { Request, Response } from "express";
import listRecipeService from "../../services/recipes/listRecipe.service";

export const listRecipeController = async (req: Request, res: Response) => {
    const recipe = await listRecipeService(req.params.id);

    return res.status(200).json(recipe);
};
