"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const updatedComment_controller_1 = require("../controllers/comments/updatedComment.controller");
const addImageOnRecipe_controller_1 = require("../controllers/recipes/addImageOnRecipe.controller");
const createRecipe_controller_1 = require("../controllers/recipes/createRecipe.controller");
const deleteImageOnRecipe_controller_1 = require("../controllers/recipes/deleteImageOnRecipe.controller");
const deleteRecipe_controller_1 = require("../controllers/recipes/deleteRecipe.controller");
const listAllRecipes_controller_1 = require("../controllers/recipes/listAllRecipes.controller");
const listRecipe_controller_1 = require("../controllers/recipes/listRecipe.controller");
const patchImageRecipe_controller_1 = require("../controllers/recipes/patchImageRecipe.controller");
const patchRecipe_controller_1 = require("../controllers/recipes/patchRecipe.controller");
const ensureAuthMiddleware_middleware_1 = require("../middlewares/ensureAuthMiddleware.middleware");
const verifySchema_middleware_1 = require("../middlewares/verifySchema.middleware");
const imagesRecipes_1 = require("../schemas/imagesRecipes/imagesRecipes");
const recipesSchema_1 = require("../schemas/recipes/recipesSchema");
const comments_schema_1 = require("../schemas/comments/comments.schema");
const recipesRouter = (0, express_1.Router)();
recipesRouter.get("", listAllRecipes_controller_1.listAllRecipesController);
recipesRouter.get("/:id", listRecipe_controller_1.listRecipeController);
recipesRouter.delete("/:id", ensureAuthMiddleware_middleware_1.ensureAuthMiddleware, deleteRecipe_controller_1.deleteRecipeController);
recipesRouter.patch("/:id", ensureAuthMiddleware_middleware_1.ensureAuthMiddleware, (0, verifySchema_middleware_1.verifySchemaMiddleware)(recipesSchema_1.recipesPacthSchema), patchRecipe_controller_1.patchRecipeController);
recipesRouter.patch("/:recipeId/imagesrecipes/:imageRecipeId", ensureAuthMiddleware_middleware_1.ensureAuthMiddleware, (0, verifySchema_middleware_1.verifySchemaMiddleware)(imagesRecipes_1.imagesRecipesSchema), patchImageRecipe_controller_1.patchImageRecipeController);
recipesRouter.post("/:recipeId/imagesrecipes", ensureAuthMiddleware_middleware_1.ensureAuthMiddleware, (0, verifySchema_middleware_1.verifySchemaMiddleware)(imagesRecipes_1.imagesRecipesSchema), addImageOnRecipe_controller_1.addImageOnRecipeController);
recipesRouter.delete("/:recipeId/imagesrecipes/:imageRecipeId", ensureAuthMiddleware_middleware_1.ensureAuthMiddleware, deleteImageOnRecipe_controller_1.deleteImageOnRecipeController);
recipesRouter.post("/:recipeId/ingredients", ensureAuthMiddleware_middleware_1.ensureAuthMiddleware);
recipesRouter.post("", ensureAuthMiddleware_middleware_1.ensureAuthMiddleware, (0, verifySchema_middleware_1.verifySchemaMiddleware)(recipesSchema_1.recipesSchema), createRecipe_controller_1.createRecipeController);
recipesRouter.patch("/:recipe_id/comments/:comment_id", ensureAuthMiddleware_middleware_1.ensureAuthMiddleware, (0, verifySchema_middleware_1.verifySchemaMiddleware)(comments_schema_1.commentsUpdated), updatedComment_controller_1.updatedCommentController);
exports.default = recipesRouter;
