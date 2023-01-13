"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createComment_controller_1 = __importDefault(require("../controllers/comments/createComment.controller"));
const deleteComment_controller_1 = __importDefault(require("../controllers/comments/deleteComment.controller"));
const listComments_controller_1 = require("../controllers/comments/listComments.controller");
const ensureAuthMiddleware_middleware_1 = require("../middlewares/ensureAuthMiddleware.middleware");
const commentsRoutes = (0, express_1.Router)();
commentsRoutes.post("", ensureAuthMiddleware_middleware_1.ensureAuthMiddleware, createComment_controller_1.default);
commentsRoutes.get("", ensureAuthMiddleware_middleware_1.ensureAuthMiddleware, listComments_controller_1.listCommentsController);
commentsRoutes.delete("/:id", ensureAuthMiddleware_middleware_1.ensureAuthMiddleware, deleteComment_controller_1.default);
exports.default = commentsRoutes;
