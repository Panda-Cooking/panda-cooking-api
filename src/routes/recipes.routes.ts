import { Router } from "express";
import { updatedCommentController } from "../controllers/comments/updatedComment.controller";
import { addImageOnRecipeController } from "../controllers/recipes/addImageOnRecipe.controller";
import { createRecipeController } from "../controllers/recipes/createRecipe.controller";
import { deleteImageOnRecipeController } from "../controllers/recipes/deleteImageOnRecipe.controller";
import { deleteRecipeController } from "../controllers/recipes/deleteRecipe.controller";
import { listAllRecipesController } from "../controllers/recipes/listAllRecipes.controller";
import { listRecipeController } from "../controllers/recipes/listRecipe.controller";
import { patchImageRecipeController } from "../controllers/recipes/patchImageRecipe.controller";
import { patchRecipeController } from "../controllers/recipes/patchRecipe.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware.middleware";
import { verifySchemaMiddleware } from "../middlewares/verifySchema.middleware";
import { imagesRecipesSchema } from "../schemas/imagesRecipes/imagesRecipes";
import {
    recipesPacthSchema,
    recipesSchema,
} from "../schemas/recipes/recipesSchema";
import { commentsUpdated } from "../schemas/comments/comments.schema";

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
recipesRouter.patch(
    "/:recipeId/imagesrecipes/:imageRecipeId",
    ensureAuthMiddleware,
    verifySchemaMiddleware(imagesRecipesSchema),
    patchImageRecipeController
);
recipesRouter.post(
    "/:recipeId/imagesrecipes",
    ensureAuthMiddleware,
    verifySchemaMiddleware(imagesRecipesSchema),
    addImageOnRecipeController
);
recipesRouter.delete(
    "/:recipeId/imagesrecipes/:imageRecipeId",
    ensureAuthMiddleware,
    deleteImageOnRecipeController
);
recipesRouter.post("/:recipeId/ingredients", ensureAuthMiddleware);
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
