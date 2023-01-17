import AppDataSource from "../../data-source";
import { Recipe } from "../../entities/recipes.entity";
import AppError from "../../errors/appError";
import { recipeByIdSchemaResponse } from "../../schemas/recipes/recipesSchema";

const listRecipeService = async (recipeId: string): Promise<object> => {
    const recipeRepo = AppDataSource.getRepository(Recipe);

    const recipe = await recipeRepo.findOne({
        where: {
            id: recipeId,
        },
        relations: {
            user: true,
            category: true,
            imagesRecipes: true,
            ingredientsRecipes: {
                ingredients: true,
            },
            preparations: true,
            comments: true,
        },
    });

    if (!recipe) {
        throw new AppError("Recipe not found", 404);
    }

    const recipeReturnData = await recipeByIdSchemaResponse.validate(recipe, {
        stripUnknown: true,
    });

    return recipeReturnData;
};

export default listRecipeService;
