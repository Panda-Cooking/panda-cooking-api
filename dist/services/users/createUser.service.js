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
const users_entity_1 = require("../../entities/users.entity");
const user_schema_1 = require("../../schemas/users/user.schema");
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(users_entity_1.User);
    const findUser = yield userRepository.findOneBy({
        email: userData.email,
    });
    if (findUser) {
        throw new appError_1.default("User already exists!", 409);
    }
    const createdUser = userRepository.create(userData);
    yield userRepository.save(createdUser);
    const userWithoutPassword = yield user_schema_1.userWithoutPasswordSchema.validate(createdUser, {
        stripUnknown: true,
    });
    return userWithoutPassword;
});
exports.default = createUserService;
