import { Request, Response } from "express";
import deleteFavoriteRecipeService from "../../services/favoriteRecipes/deleteFavoriteRecipe.service";

const deleteFavoriteRecipeController = async (req: Request, res: Response) => {
    const favoriteRecipeId = req.params.id;
    const userId = req.userId;

    const status = await deleteFavoriteRecipeService(favoriteRecipeId);

    return res.status(status).json();
};

export default deleteFavoriteRecipeController;
