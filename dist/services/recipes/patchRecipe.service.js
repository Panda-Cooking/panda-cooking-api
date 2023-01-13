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
const categories_entity_1 = require("../../entities/categories.entity");
const recipes_entity_1 = require("../../entities/recipes.entity");
const appError_1 = __importDefault(require("../../errors/appError"));
const patchRecipeService = (recipeId, userId, recipeData) => __awaiter(void 0, void 0, void 0, function* () {
    const recipesRepo = data_source_1.default.getRepository(recipes_entity_1.Recipe);
    const categoryRepo = data_source_1.default.getRepository(categories_entity_1.Category);
    const findRecipe = yield recipesRepo.findOne({
        where: {
            id: recipeId,
            user: {
                id: userId,
            },
        },
        relations: {
            user: true,
            category: true,
            imagesRecipes: true,
            ingredientsRecipes: {
                ingredients: true,
            },
            preparations: true,
        },
    });
    if (!findRecipe) {
        throw new appError_1.default("Recipe not found / User can only update their own recipes", 404);
    }
    const categoryRecipe = yield categoryRepo.findOneBy({
        name: recipeData.category.toLowerCase(),
    });
    if (!categoryRecipe) {
        throw new appError_1.default("Recipe cannot be registered without category.");
    }
    const updateRecipe = yield recipesRepo
        .createQueryBuilder("recipes")
        .innerJoin("recipes.category", "category")
        .update()
        .set({
        name: recipeData.name,
        description: recipeData.description,
        time: recipeData.time,
        portions: recipeData.portions,
        category: categoryRecipe,
    })
        .where("recipes.id = :id", {
        id: findRecipe.id,
    })
        .returning("*")
        .execute();
    return updateRecipe.raw[0];
});
exports.default = patchRecipeService;
