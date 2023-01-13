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
const appError_1 = __importDefault(require("../../errors/appError"));
const coments_entity_1 = require("../../entities/coments.entity");
const recipes_entity_1 = require("../../entities/recipes.entity");
const users_entity_1 = require("../../entities/users.entity");
const comments_schema_1 = require("../../schemas/comments/comments.schema");
const updatedCommentService = (commentData, recipeId, commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const commentRepository = data_source_1.default.getRepository(coments_entity_1.Comment);
    const recipeRepository = data_source_1.default.getRepository(recipes_entity_1.Recipe);
    const userRepository = data_source_1.default.getRepository(users_entity_1.User);
    const findComment = yield commentRepository.findOneBy({
        id: commentId,
    });
    const findRecipe = yield recipeRepository.findOneBy({
        id: recipeId,
    });
    const findUser = yield userRepository.findOne({
        where: {
            id: userId,
            comments: {
                id: commentId,
            },
        },
        relations: {
            comments: {
                user: true,
            },
        },
    });
    const isAdm = findUser.isAdm;
    if (!isAdm && findUser.comments[0].user.id !== userId) {
        throw new appError_1.default("unauthorized", 401);
    }
    try {
        const updatedComment = yield commentRepository.save({
            id: findComment.id,
            user: findUser,
            recipe: findRecipe,
            description: commentData.description,
        });
        const updatedComments = yield comments_schema_1.commentsUpdated.validate(updatedComment, {
            stripUnknown: true,
        });
        return updatedComments;
    }
    catch (error) {
        throw new appError_1.default(error.message, 404);
    }
});
exports.default = updatedCommentService;
