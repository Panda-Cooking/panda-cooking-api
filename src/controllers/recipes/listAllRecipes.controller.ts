import { Request, Response } from "express";
import listAllRecipesService from "../../services/recipes/listAllRecipes.service";

export const listAllRecipesController = async (req: Request, res: Response) => {
    const allRecipes = await listAllRecipesService();

    return res.status(200).json(allRecipes);
};
