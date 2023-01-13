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
exports.patchUserService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const users_entity_1 = require("../../entities/users.entity");
const user_schema_1 = require("../../schemas/users/user.schema");
const bcryptjs_1 = require("bcryptjs");
const patchUserService = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(users_entity_1.User);
    const user = yield userRepo.findOneBy({ id: userId });
    if (userData.name) {
        user.name = userData.name;
    }
    if (userData.email) {
        user.email = userData.email;
    }
    if (userData.password) {
        user.password = yield (0, bcryptjs_1.hash)(userData.password, 10);
    }
    if (userData.imageProfile) {
        user.imageProfile = userData.imageProfile;
    }
    yield userRepo.save(user);
    const returnContent = yield user_schema_1.userWithoutPasswordSchema.validate(user, {
        stripUnknown: true
    });
    return returnContent;
});
exports.patchUserService = patchUserService;
