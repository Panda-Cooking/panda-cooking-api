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
exports.ensureUserAdmMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const data_source_1 = __importDefault(require("../data-source"));
const users_entity_1 = require("../entities/users.entity");
const ensureUserAdmMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let userToken = req.headers.authorization;
    let userId = '';
    if (!userToken) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
    userToken = userToken.split(' ')[1];
    jsonwebtoken_1.default.verify(userToken, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                message: error.message
            });
        }
        userId = decoded.sub;
    });
    req.userId = userId;
    const userRepo = data_source_1.default.getRepository(users_entity_1.User);
    const user = yield userRepo.findOneBy({ id: userId });
    if (!user.isAdm) {
        return res.status(401).json({
            message: 'You are not authorized to do this action'
        });
    }
    return next();
});
exports.ensureUserAdmMiddleware = ensureUserAdmMiddleware;
