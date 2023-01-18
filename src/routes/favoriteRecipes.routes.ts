import { Router } from "express";
import { addFavoriteRecipeController } from "../controllers/favoriteRecipes/addFavoriteRecipe.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware.middleware";

const favoriteRecipesRouter = Router();

favoriteRecipesRouter.post(
    "/:id",
    ensureAuthMiddleware,
    addFavoriteRecipeController
);
favoriteRecipesRouter.delete("");

export default favoriteRecipesRouter;
