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
exports.verifySchemaMiddleware = void 0;
const ValidationError_1 = __importDefault(require("yup/lib/ValidationError"));
const verifySchemaMiddleware = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedBody = yield schema.validate(req.body, {
            stripUnknown: true,
            abortEarly: false,
        });
        req.body = validatedBody;
        next();
    }
    catch (error) {
        if (error instanceof ValidationError_1.default) {
            res.status(400).json({
                message: error.errors,
            });
        }
    }
});
exports.verifySchemaMiddleware = verifySchemaMiddleware;
