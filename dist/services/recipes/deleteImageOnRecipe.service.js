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
const imagesRecipes_entity_1 = require("../../entities/imagesRecipes.entity");
const appError_1 = __importDefault(require("../../errors/appError"));
const deleteImageOnRecipeService = (recipeId, imageRecipeId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const imagesRecipesRepo = data_source_1.default.getRepository(imagesRecipes_entity_1.ImagesRecipes);
    const findImageRecipe = yield imagesRecipesRepo.findOne({
        where: {
            id: imageRecipeId,
            recipe: {
                id: recipeId,
            },
        },
        relations: {
            recipe: {
                user: true,
            },
        },
    });
    if (!findImageRecipe) {
        throw new appError_1.default("Recipe or image not found", 404);
    }
    if (findImageRecipe.recipe.user.id !== userId) {
        throw new appError_1.default("User is not the author of the recipe", 403);
    }
    yield imagesRecipesRepo.remove(findImageRecipe);
    return {};
});
exports.default = deleteImageOnRecipeService;
