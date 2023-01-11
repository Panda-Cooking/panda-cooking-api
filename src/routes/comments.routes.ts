import { Router } from "express";
import createCommentController from "../controllers/comments/createComment.controller";

const commentsRoutes = Router();

commentsRoutes.post("", createCommentController);

export default commentsRoutes