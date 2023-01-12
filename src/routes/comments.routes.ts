import { Router } from "express";
import createCommentController from "../controllers/comments/createComment.controller";
import deleteCommentController from "../controllers/comments/deleteComment.controller";
import { listCommentsController } from "../controllers/comments/listComments.controller";

const commentsRoutes = Router();

commentsRoutes.post("", createCommentController);
commentsRoutes.get("", listCommentsController);
commentsRoutes.delete("/:id", deleteCommentController);

export default commentsRoutes;
