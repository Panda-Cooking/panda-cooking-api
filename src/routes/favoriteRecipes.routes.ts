import { Router } from "express";
import { addFavoriteRecipeController } from "../controllers/favoriteRecipes/addFavoriteRecipe.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware.middleware";
import deleteFavoriteRecipeController from "../controllers/favoriteRecipes/deleteFavoriteRecipe.controller";

const favoriteRecipesRouter = Router();

favoriteRecipesRouter.post(
    "/:id",
    ensureAuthMiddleware,
    addFavoriteRecipeController
);
favoriteRecipesRouter.delete(
    "/:id",
    ensureAuthMiddleware,
    deleteFavoriteRecipeController
);

export default favoriteRecipesRouter;
