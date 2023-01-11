import { Router } from "express";
import { createRecipeController } from "../controllers/recipes/createRecipe.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware.middleware";
import { verifySchemaMiddleware } from "../middlewares/verifySchema.middleware";
import { recipesSchema } from "../schemas/recipes/recipesSchema";

const recipesRouter = Router();

recipesRouter.post(
    "",
    // ensureAuthMiddleware,
    verifySchemaMiddleware(recipesSchema),
    createRecipeController
);


export default recipesRouter;
