import { Router } from "express";
import createCommentController, { listCommentsController } from "../controllers/comments/createComment.controller";

const commentsRoutes = Router();

commentsRoutes.post("", createCommentController);
commentsRoutes.get("", listCommentsController);

export default commentsRoutes