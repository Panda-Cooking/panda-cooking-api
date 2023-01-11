import { Router } from "express";
import { updatedCommentController } from "../controllers/comments.controller";

const commentsRoutes = Router();

commentsRoutes.patch("/recipes/:recipe_id/comments/:comment_id", updatedCommentController);

export default commentsRoutes;
