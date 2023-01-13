"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedCommentController = void 0;
const updatedComment_service_1 = __importDefault(require("../../services/comments/updatedComment.service"));
const updatedCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const recipeId = req.params.recipe_id;
    const commentId = req.params.comment_id;
    const userId = req.userId;
    const updatedComment = yield (0, updatedComment_service_1.default)(data, recipeId, commentId, userId);
    return res.json(updatedComment);
});
exports.updatedCommentController = updatedCommentController;
