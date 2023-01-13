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
const imagesRecipes_entity_1 = require("../../entities/imagesRecipes.entity");
const ingredients_entity_1 = require("../../entities/ingredients.entity");
const ingredientsRecipes_entity_1 = require("../../entities/ingredientsRecipes.entity");
const preparations_entity_1 = require("../../entities/preparations.entity");
const recipes_entity_1 = require("../../entities/recipes.entity");
const users_entity_1 = require("../../entities/users.entity");
const appError_1 = __importDefault(require("../../errors/appError"));
const recipesSchema_1 = require("../../schemas/recipes/recipesSchema");
const createRecipeService = (userAuthId, recipeData) => __awaiter(void 0, void 0, void 0, function* () {
    const recipesRepo = data_source_1.default.getRepository(recipes_entity_1.Recipe);
    const categoryRepo = data_source_1.default.getRepository(categories_entity_1.Category);
    const imagesRecipesRepo = data_source_1.default.getRepository(imagesRecipes_entity_1.ImagesRecipes);
    const ingredientsRecipesRepo = data_source_1.default.getRepository(ingredientsRecipes_entity_1.IngredientsRecipes);
    const ingredientsRepo = data_source_1.default.getRepository(ingredients_entity_1.Ingredients);
    const preparationsRepo = data_source_1.default.getRepository(preparations_entity_1.Preparations);
    const userRepo = data_source_1.default.getRepository(users_entity_1.User);
    const categoryRecipe = yield categoryRepo.findOneBy({
        name: recipeData.category.toLowerCase(),
    });
    const userAuth = yield userRepo.findOneBy({
        id: userAuthId,
    });
    if (!categoryRecipe) {
        throw new appError_1.default("Recipe cannot be registered without category.");
    }
    const newRecipe = recipesRepo.create(Object.assign(Object.assign({}, recipeData), { category: categoryRecipe, user: userAuth }));
    const newRecipeSaved = yield recipesRepo.save(newRecipe);
    recipeData.imagesRecipes.forEach((image) => __awaiter(void 0, void 0, void 0, function* () {
        const newImage = imagesRecipesRepo.create(Object.assign(Object.assign({}, image), { recipe: newRecipeSaved }));
        yield imagesRecipesRepo.save(newImage);
    }));
    recipeData.ingredients.forEach((ingredient) => __awaiter(void 0, void 0, void 0, function* () {
        const ingredientName = ingredient.name;
        const ingredientAmount = ingredient.amount;
        let findIngredient = yield ingredientsRepo.findOneBy({
            name: ingredientName,
        });
        if (!findIngredient) {
            const newIngredient = ingredientsRepo.create({
                name: ingredientName,
            });
            findIngredient = yield ingredientsRepo.save(newIngredient);
        }
        const newIngredientToRecipes = ingredientsRecipesRepo.create({
            ingredients: findIngredient,
            recipe: newRecipeSaved,
            amount: ingredientAmount,
        });
        yield ingredientsRecipesRepo.save(newIngredientToRecipes);
    }));
    recipeData.preparations.forEach((preparation) => __awaiter(void 0, void 0, void 0, function* () {
        const newPreparation = preparationsRepo.create(Object.assign(Object.assign({}, preparation), { recipe: newRecipeSaved }));
        yield preparationsRepo.save(newPreparation);
    }));
    newRecipeSaved["ingredients"] = recipeData.ingredients;
    const returnDataRecipe = yield recipesSchema_1.recipesSchemaResponse.validate(newRecipeSaved, {
        stripUnknown: true,
    });
    return returnDataRecipe;
});
exports.default = createRecipeService;
