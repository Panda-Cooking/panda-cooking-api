import { Router } from "express";
import createCommentController, {
    listCommentsController,
} from "../controllers/comments/createComment.controller";
import deleteCommentController from "../controllers/comments/deleteComment.controller";

const commentsRoutes = Router();

commentsRoutes.post("", createCommentController);
commentsRoutes.get("", listCommentsController);
commentsRoutes.delete("/:id", deleteCommentController);

export default commentsRoutes;
