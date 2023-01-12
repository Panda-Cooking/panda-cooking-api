import { Router } from "express";
import { updatedCommentController } from "../controllers/comments/createComment.controller";
import { createRecipeController } from "../controllers/recipes/createRecipe.controller";
import { listAllRecipesController } from "../controllers/recipes/listAllRecipes.controller";
import { listRecipeController } from "../controllers/recipes/listRecipe.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware.middleware";
import { verifySchemaMiddleware } from "../middlewares/verifySchema.middleware";
import { recipesSchema } from "../schemas/recipes/recipesSchema";

const recipesRouter = Router();

recipesRouter.get("", listAllRecipesController);
recipesRouter.get("/:id", listRecipeController);
recipesRouter.post(
    "",
    ensureAuthMiddleware,
    verifySchemaMiddleware(recipesSchema),
    createRecipeController
);
recipesRouter.patch(
    "/:recipe_id/comments/:comment_id",
    updatedCommentController
);

export default recipesRouter;
