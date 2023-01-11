import { Router } from "express";
import { createRecipeController } from "../controllers/recipes/createRecipe.controller";
import { updatedCommentController } from "../controllers/comments.controller";

const recipesRouter = Router();

recipesRouter.post("", createRecipeController);
recipesRouter.patch("/:recipe_id/comments/:comment_id", updatedCommentController);

export default recipesRouter;
