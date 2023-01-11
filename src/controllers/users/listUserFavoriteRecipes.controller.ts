import { Request, Response } from "express";
import { listUserFavoriteRecipesService } from "../../services/users/listUserFavoriteRecipes.service";

export const listUserFavoriteRecipesController = async (req: Request, res: Response) => {
    const favoriteRecipes = await listUserFavoriteRecipesService(req.userId)
    return res.json(favoriteRecipes)
}