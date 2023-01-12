import { Router } from "express";
import { updatedCommentController } from "../controllers/comments/updatedComment.controller";
import { createRecipeController } from "../controllers/recipes/createRecipe.controller";
import { deleteRecipeController } from "../controllers/recipes/deleteRecipe.controller";
import { listAllRecipesController } from "../controllers/recipes/listAllRecipes.controller";
import { listRecipeController } from "../controllers/recipes/listRecipe.controller";
import { patchRecipeController } from "../controllers/recipes/patchRecipe.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware.middleware";
import { verifySchemaMiddleware } from "../middlewares/verifySchema.middleware";
import {
    recipesPacthSchema,
    recipesSchema,
} from "../schemas/recipes/recipesSchema";

const recipesRouter = Router();

recipesRouter.get("", listAllRecipesController);
recipesRouter.get("/:id", listRecipeController);
recipesRouter.delete("/:id", ensureAuthMiddleware, deleteRecipeController);
recipesRouter.patch(
    "/:id",
    ensureAuthMiddleware,
    verifySchemaMiddleware(recipesPacthSchema),
    patchRecipeController
);
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
