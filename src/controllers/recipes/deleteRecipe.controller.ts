import { Request, Response } from "express";
import deleteRecipeService from "../../services/recipes/deleteRecipe.service";

export const deleteRecipeController = async (req: Request, res: Response) => {
    const data = await deleteRecipeService(req.params.id);

    return res.status(204).json(data);
};
