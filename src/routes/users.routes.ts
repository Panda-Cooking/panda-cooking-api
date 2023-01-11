import { Router } from "express";
import { listUserProfileController } from "../controllers/users/listUserProfileController.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware.middleware";

const usersRouter = Router();

usersRouter.get("/profile", ensureAuthMiddleware, listUserProfileController)

export default usersRouter