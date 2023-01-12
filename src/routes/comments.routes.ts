import { Router } from "express";
import createCommentController from "../controllers/comments/createComment.controller";
import deleteCommentController from "../controllers/comments/deleteComment.controller";
import { listCommentsController } from "../controllers/comments/listComments.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuthMiddleware.middleware";

const commentsRoutes = Router();

commentsRoutes.post("", ensureAuthMiddleware, createCommentController);
commentsRoutes.get("", ensureAuthMiddleware,listCommentsController);
commentsRoutes.delete("/:id", deleteCommentController);

export default commentsRoutes;
