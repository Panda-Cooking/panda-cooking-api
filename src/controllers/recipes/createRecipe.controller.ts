import { Request, Response } from "express";
import createRecipeService from "../../services/recipes/createRecipe.service";

export const createRecipeController = async (req: Request, res: Response) => {
    const newRecipe = await createRecipeService(req.userId, req.body);

    return res.status(201).json(newRecipe);
};
