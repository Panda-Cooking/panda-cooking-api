import { Router } from "express";
import { createRecipeController } from "../controllers/recipes/createRecipe.controller";

const recipesRouter = Router();

recipesRouter.post("", createRecipeController);

export default recipesRouter;
