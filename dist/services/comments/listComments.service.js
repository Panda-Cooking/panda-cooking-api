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
const appError_1 = __importDefault(require("../../errors/appError"));
const listCommentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentRepository = data_source_1.default.getRepository(coments_entity_1.Comment);
        const comments = yield commentRepository
            .createQueryBuilder("comments")
            .innerJoinAndSelect("comments.user", "user")
            .select([
            "comments",
            "user.id",
            "user.name",
            "user.email",
            "user.imageProfile",
        ]).
            getMany();
        return comments;
    }
    catch (error) {
        throw new appError_1.default(error.message, 404);
    }
});
exports.default = listCommentsService;
