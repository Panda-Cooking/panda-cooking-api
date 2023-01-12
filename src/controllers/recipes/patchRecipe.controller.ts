import { Request, Response } from "express";
import patchRecipeService from "../../services/recipes/patchRecipe.service";

export const patchRecipeController = async (req: Request, res: Response) => {
    const data = await patchRecipeService(req.params.id, req.userId, req.body);

    return res.status(200).json(data);
};
