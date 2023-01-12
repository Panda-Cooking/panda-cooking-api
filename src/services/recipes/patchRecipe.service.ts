import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { Recipe } from "../../entities/recipes.entity";
import AppError from "../../errors/appError";
import { iRecipePatchRequest } from "../../interfaces/recipes/recipesInterface";

const patchRecipeService = async (
    recipeId: string,
    userId: string,
    recipeData: iRecipePatchRequest
) => {
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
        throw new AppError(
            "Recipe not found / User can only update their own recipes",
            404
        );
    }
    const categoryRecipe = await categoryRepo.findOneBy({
        name: recipeData.category.toLowerCase(),
    });

    if (!categoryRecipe) {
        throw new AppError("Recipe cannot be registered without category.");
    }

    const updateRecipe = await recipesRepo
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
};

export default patchRecipeService;
