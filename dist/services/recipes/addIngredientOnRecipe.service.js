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
Object.defineProperty(exports, "__esModule", { value: true });
const addIngredientOnRecipeService = (ingredients, recipeId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // const recipeRepo = AppDataSource.getRepository(Recipe);
    // const ingredientsRecipesRepo =
    //     AppDataSource.getRepository(IngredientsRecipes);
    // const ingredientsRepo = AppDataSource.getRepository(Ingredients);
    // const findRecipe = await recipeRepo.findOne({
    //     where: {
    //         id: recipeId,
    //     },
    //     relations: {
    //         user: true,
    //     },
    // });
    // if (findRecipe.user.id !== userId) {
    //     throw new AppError("User is not the author of the recipe", 403);
    // }
    // ingredients.forEach(async (ingredient) => {
    //     const findIngredientOnRecipe = await ingredientsRepo.findOne({
    //         where: {
    //             name: ingredient.name,
    //             ingredientsRecipes: {
    //                 recipe: {
    //                     id: recipeId,
    //                 },
    //             },
    //         },
    //     });
    //     if (findIngredientOnRecipe) {
    //         throw new AppError("Recipe already has ingredient", 409);
    //     }
    //     await
    // });
});
exports.default = addIngredientOnRecipeService;
