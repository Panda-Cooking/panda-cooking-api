import AppDataSource from "../../data-source";
import { IngredientsRecipes } from "../../entities/ingredientsRecipes.entity";
import AppError from "../../errors/appError";

const deleteIngredientOnRecipeService = async (
    recipeId,
    ingredientId,
    userId
): Promise<object> => {
    const ingredientsRecipesRepo =
        AppDataSource.getRepository(IngredientsRecipes);

    const findIngredientOnRecipe = await ingredientsRecipesRepo.findOne({
        where: {
            ingredients: {
                id: ingredientId,
            },
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

    if (!findIngredientOnRecipe) {
        throw new AppError("Ingredient or recipe not found", 404);
    }

    await ingredientsRecipesRepo.remove(findIngredientOnRecipe);

    return {};
};

export default deleteIngredientOnRecipeService;
