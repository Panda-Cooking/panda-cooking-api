import { Router } from "express";
import { deleteUserController } from "../controllers/admin/deleteUser.controller";
import { listUserFavoriteRecipesController } from "../controllers/users/listUserFavoriteRecipes.controller";
import { listUserProfileController } from "../controllers/users/listUserProfileController.controller";
import { patchUserController } from "../controllers/users/patchUserController.controller";
import { createUserController } from "../controllers/users/createUser.controllers";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware.middleware";
import ensurePatchDataStructure from "../middlewares/ensurePatchDataStructure.middleware";
import { ensureUserAdmMiddleware } from "../middlewares/ensureUserAdm.middleware";
import { verifySchemaMiddleware } from "../middlewares/verifySchema.middleware";
import { patchDataSchema, userSchema } from "../schemas/users/user.schema";

const usersRouter = Router();

usersRouter.get("/profile", ensureAuthMiddleware, listUserProfileController);
usersRouter.post("", verifySchemaMiddleware(userSchema), createUserController);
usersRouter.patch(
    "/profile",
    ensureAuthMiddleware,
    ensurePatchDataStructure,
    verifySchemaMiddleware(patchDataSchema),
    patchUserController
);
usersRouter.get(
    "/profile/favoriteRecipes",
    ensureAuthMiddleware,
    listUserFavoriteRecipesController
);
usersRouter.delete("/:id", ensureAuthMiddleware, deleteUserController);

export default usersRouter;
