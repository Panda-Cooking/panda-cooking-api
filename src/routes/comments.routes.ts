import { Router } from "express";
import { updatedCommentController } from "../controllers/comments.controller";
import createCommentController from "../controllers/comments/createComment.controller";

const commentsRoutes = Router();

commentsRoutes.post("", createCommentController);
commentsRoutes.patch("/recipes/:recipe_id/comments/:comment_id", updatedCommentController);

export default commentsRoutes