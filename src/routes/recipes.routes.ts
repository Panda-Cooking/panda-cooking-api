import { Router } from "express";
import { updatedCommentController } from "../controllers/comments/updatedComment.controller";
import { createRecipeController } from "../controllers/recipes/createRecipe.controller";
import { deleteRecipeController } from "../controllers/recipes/deleteRecipe.controller";
import { listAllRecipesController } from "../controllers/recipes/listAllRecipes.controller";
import { listRecipeController } from "../controllers/recipes/listRecipe.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware.middleware";
import validatedIsAdmMiddleware from "../middlewares/validatedIsAdm.middleware";
import { verifySchemaMiddleware } from "../middlewares/verifySchema.middleware";
import { commentsUpdated } from "../schemas/comments/comments.schema";
import { recipesSchema } from "../schemas/recipes/recipesSchema";

const recipesRouter = Router();

recipesRouter.get("", listAllRecipesController);
recipesRouter.get("/:id", listRecipeController);
recipesRouter.delete("/:id", ensureAuthMiddleware, deleteRecipeController);
recipesRouter.post(
    "",
    ensureAuthMiddleware,
    verifySchemaMiddleware(recipesSchema),
    createRecipeController
);
recipesRouter.patch(
    "/:recipe_id/comments/:comment_id",
    ensureAuthMiddleware,
    verifySchemaMiddleware(commentsUpdated),
    updatedCommentController
);

export default recipesRouter;
