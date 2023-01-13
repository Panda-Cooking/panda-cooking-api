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
const addImageOnRecipeService = (newImage, recipeId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const imagesRecipesRepo = data_source_1.default.getRepository(imagesRecipes_entity_1.ImagesRecipes);
    const findRecipe = yield imagesRecipesRepo.findOne({
        where: {
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
    if (!findRecipe) {
        throw new appError_1.default("Recipe not found", 404);
    }
    if (findRecipe.recipe.user.id !== userId) {
        throw new appError_1.default("User is not the author of the recipe", 403);
    }
    const newImageOnRecipe = imagesRecipesRepo.create({
        url: newImage.url,
        recipe: findRecipe.recipe,
    });
    yield imagesRecipesRepo.save(newImageOnRecipe);
    return {
        message: "New image added on recipe.",
    };
});
exports.default = addImageOnRecipeService;
