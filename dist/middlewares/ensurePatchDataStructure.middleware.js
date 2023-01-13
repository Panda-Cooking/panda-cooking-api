"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../errors/appError"));
const ensurePatchDataStructure = (req, res, next) => {
    const patchContent = req.body;
    if ('isAdm' in patchContent || 'id' in patchContent) {
        throw new appError_1.default('The following settings cant be modified: -isAdm- and -id-', 401);
    }
    ;
    return next();
};
exports.default = ensurePatchDataStructure;
