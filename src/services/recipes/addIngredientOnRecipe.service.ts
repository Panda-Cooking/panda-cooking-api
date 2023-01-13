import AppDataSource from "../../data-source";
import { Ingredients } from "../../entities/ingredients.entity";
import { IngredientsRecipes } from "../../entities/ingredientsRecipes.entity";
import { Recipe } from "../../entities/recipes.entity";
import AppError from "../../errors/appError";
import { iIngredientsRecipesRequest } from "../../interfaces/ingredientsRecipes/ingredientsRecipesInterface";

const addIngredientOnRecipeService = async (
    ingredients: iIngredientsRecipesRequest[],
    recipeId: string,
    userId: string
) => {
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
};

export default addIngredientOnRecipeService;
