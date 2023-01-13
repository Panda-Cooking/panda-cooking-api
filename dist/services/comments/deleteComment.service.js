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
const data_source_1 = __importDefault(require("../../data-source"));
const coments_entity_1 = require("../../entities/coments.entity");
const users_entity_1 = require("../../entities/users.entity");
const appError_1 = __importDefault(require("../../errors/appError"));
const deleteCommentService = (commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const comentaryRepo = data_source_1.default.getRepository(coments_entity_1.Comment);
    const userRepo = data_source_1.default.getRepository(users_entity_1.User);
    const comment = yield comentaryRepo.findOneBy({ id: commentId });
    const user = yield userRepo.findOneBy({ id: userId });
    if (!comment) {
        throw new appError_1.default("Comment not found", 404);
    }
    const commentQueryBuilder = comentaryRepo.createQueryBuilder("comment");
    const commentary = yield commentQueryBuilder
        .leftJoinAndSelect("comment.user", "user")
        .leftJoinAndSelect("comment.recipe", "recipe")
        .where("comment.id = :id", { id: commentId })
        .getOne();
    if (commentary.user.id !== userId) {
        if (user.isAdm === false) {
            throw new appError_1.default("Missing admin permissions", 403);
        }
    }
    yield comentaryRepo.delete({ id: comment.id });
    return 204;
});
exports.default = deleteCommentService;
