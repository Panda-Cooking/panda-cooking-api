import { Router } from "express";
import deleteFavoriteRecipeController from "../controllers/favoriteRecipes/deleteFavoriteRecipe.controller";

const favoriteRecipesRouter = Router();

favoriteRecipesRouter.post("");
favoriteRecipesRouter.delete("/:id", deleteFavoriteRecipeController);

export default favoriteRecipesRouter;
