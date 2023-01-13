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
exports.listRecipeController = void 0;
const listRecipe_service_1 = __importDefault(require("../../services/recipes/listRecipe.service"));
const listRecipeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield (0, listRecipe_service_1.default)(req.params.id);
    return res.status(200).json(recipe);
});
exports.listRecipeController = listRecipeController;
