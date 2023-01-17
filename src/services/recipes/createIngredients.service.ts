import AppDataSource from "../../data-source";
import { Ingredients } from "../../entities/ingredients.entity";
import { IngredientsRecipes } from "../../entities/ingredientsRecipes.entity";
import { Recipe } from "../../entities/recipes.entity";
import AppError from "../../errors/appError";
import { iIngredientsRecipesRequest } from "../../interfaces/ingredientsRecipes/ingredientsRecipesInterface";

const createIngredientsService = async (
    ingredient: iIngredientsRecipesRequest,
    recipeId: string
): Promise<void> => {
    const ingredientsRepo = AppDataSource.getRepository(Ingredients);
    const ingredientsRecipesRepo =
        AppDataSource.getRepository(IngredientsRecipes);
    const recipeRepo = AppDataSource.getRepository(Recipe);

    const ingredientName = ingredient.name.toLowerCase();
    const ingredientAmount = ingredient.amount;

    const findRecipe = await recipeRepo.findOne({
        where: {
            id: recipeId,
        },
    });

    if (!findRecipe) {
        throw new AppError("Recipe not found", 404);
    }

    let findIngredient = await ingredientsRepo.findOneBy({
        name: ingredientName,
    });

    if (!findIngredient) {
        const newIngredient = ingredientsRepo.create({
            name: ingredientName,
        });

        findIngredient = await ingredientsRepo.save(newIngredient);
    }

    const newIngredientToRecipes = ingredientsRecipesRepo.create({
        ingredients: findIngredient,
        recipe: findRecipe,
        amount: ingredientAmount,
    });

    await ingredientsRecipesRepo.save(newIngredientToRecipes);
};

export default createIngredientsService;
