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
const recipes_entity_1 = require("../../entities/recipes.entity");
const users_entity_1 = require("../../entities/users.entity");
const appError_1 = __importDefault(require("../../errors/appError"));
const createCommentService = (commentData) => __awaiter(void 0, void 0, void 0, function* () {
    const commentaryRepo = data_source_1.default.getRepository(coments_entity_1.Comment);
    const userRepo = data_source_1.default.getRepository(users_entity_1.User);
    const recipeRepo = data_source_1.default.getRepository(recipes_entity_1.Recipe);
    const user = yield userRepo.findOneBy({ id: commentData.userId });
    const recipe = yield recipeRepo.findOneBy({ id: commentData.recipeId });
    const comment = commentaryRepo.create(commentData);
    if (!user) {
        throw new appError_1.default("User does not exists", 404);
    }
    if (!recipe) {
        throw new appError_1.default("Recipe does not exists", 404);
    }
    yield commentaryRepo.save(comment);
    yield commentaryRepo.update({ id: comment.id }, { user: user, recipe: recipe });
    return comment;
});
exports.default = createCommentService;
