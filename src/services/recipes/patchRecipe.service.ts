import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { Recipe } from "../../entities/recipes.entity";
import AppError from "../../errors/appError";
import { iRecipePatchRequest } from "../../interfaces/recipes/recipesInterface";

const patchRecipeService = async (
    recipeId: string,
    userId: string,
    recipeData: iRecipePatchRequest
): Promise<Recipe> => {
    const recipesRepo = AppDataSource.getRepository(Recipe);
    const categoryRepo = AppDataSource.getRepository(Category);

    const findRecipe = await recipesRepo.findOne({
        where: {
            id: recipeId,
            user: {
                id: userId,
            },
        },
        relations: {
            category: true,
        },
    });

    if (!findRecipe) {
        throw new AppError(
            "Recipe not found / User can only update their own recipes",
            404
        );
    }

    const newDataRecipe = { ...recipeData, category: findRecipe.category };

    if (recipeData.category) {
        const category = await categoryRepo.findOneBy({
            name: recipeData.category.toLowerCase(),
        });

        newDataRecipe["category"] = category;

        if (!category) {
            throw new AppError("Recipe cannot be registered without category.");
        }
    }

    const recipeUpdated = await recipesRepo.save({
        ...findRecipe,
        ...newDataRecipe,
    });

    return recipeUpdated;
};

export default patchRecipeService;
