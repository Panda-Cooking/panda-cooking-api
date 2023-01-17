import AppDataSource from "../../data-source";
import { Recipe } from "../../entities/recipes.entity";
import AppError from "../../errors/appError";
import { iIngredientsRecipesRequest } from "../../interfaces/ingredientsRecipes/ingredientsRecipesInterface";
import createIngredientsService from "./createIngredients.service";

const addIngredientOnRecipeService = async (
    ingredients: iIngredientsRecipesRequest[],
    recipeId: string
): Promise<object> => {
    const recipeRepo = AppDataSource.getRepository(Recipe);

    const findRecipe = await recipeRepo.findOne({
        where: {
            id: recipeId,
        },
        relations: {
            ingredientsRecipes: {
                ingredients: true,
            },
        },
    });

    if (!findRecipe) {
        throw new AppError("Recipe not found", 404);
    }

    for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        await createIngredientsService(ingredient, findRecipe.id);
    }

    return {
        message: "Ingredients added",
    };
};

export default addIngredientOnRecipeService;
