import { Router } from "express";
import createCommentController from "../controllers/comments/createComment.controller";
import deleteCommentController from "../controllers/comments/deleteComment.controller";

const commentsRoutes = Router();

commentsRoutes.post("", createCommentController);
commentsRoutes.delete("/:id", deleteCommentController);

export default commentsRoutes;
