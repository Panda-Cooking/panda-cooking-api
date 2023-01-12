import AppDataSource from "../../data-source";
import { Recipe } from "../../entities/recipes.entity";

const listRecipeService = async (recipeId: string): Promise<Recipe> => {
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

    return recipe;
};

export default listRecipeService;
