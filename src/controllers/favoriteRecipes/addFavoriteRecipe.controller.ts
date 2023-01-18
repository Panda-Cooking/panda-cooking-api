import { Request, Response } from "express";
import addFavoriteRecipeService from "../../services/favoriteRecipes/addFavoriteRecipe.service";

export const addFavoriteRecipeController = async (
    req: Request,
    res: Response
) => {
    const data = await addFavoriteRecipeService(req.userId, req.params.id);

    return res.status(201).json(data);
};
