import { Router } from "express";
import { listUserProfileController } from "../controllers/users/listUserProfileController.controller";
import { createUserController } from "../controllers/users/users.controllers";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware.middleware";
import { verifySchemaMiddleware } from "../middlewares/verifySchema.middleware";
import { userSchema } from "../schemas/users/user.schema";

const usersRouter = Router();

usersRouter.get("/profile", ensureAuthMiddleware, listUserProfileController);
usersRouter.post("", verifySchemaMiddleware(userSchema), createUserController);

export default usersRouter;
