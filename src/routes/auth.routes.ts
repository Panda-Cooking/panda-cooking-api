import { Router } from "express";
import { authController } from "../controllers/auth/auth.controller";
import { verifySchemaMiddleware } from "../middlewares/verifySchema.middleware";
import { authSchemaRequest } from "../schemas/auth/authSchema";

const authRouter = Router();

authRouter.post("", verifySchemaMiddleware(authSchemaRequest), authController);

export default authRouter;
