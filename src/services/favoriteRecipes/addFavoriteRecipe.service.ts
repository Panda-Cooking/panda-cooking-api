import AppDataSource from "../../data-source";
import { FavoriteRecipes } from "../../entities/favoriteRecipes.entity";
import { Recipe } from "../../entities/recipes.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/appError";

const addFavoriteRecipeService = async (
    userId: string,
    recipeId: string
): Promise<object> => {
    const favoriteRecipesRepo = AppDataSource.getRepository(FavoriteRecipes);
    const userRepo = AppDataSource.getRepository(User);
    const recipeRepo = AppDataSource.getRepository(Recipe);

    const user = await userRepo.findOne({
        where: {
            id: userId,
        },
    });

    const recipe = await recipeRepo.findOne({
        where: {
            id: recipeId,
        },
    });

    if (!recipe) {
        throw new AppError("Recipe not found", 404);
    }

    const recipeHasFavorited = await favoriteRecipesRepo.findOne({
        where: {
            user: {
                id: userId,
            },
            recipe: {
                id: recipeId,
            },
        },
    });

    if (recipeHasFavorited) {
        throw new AppError("Recipe has favorited", 409);
    }

    await favoriteRecipesRepo.save({
        recipe,
        user,
    });

    return {
        message: "Recipe added to your favorites list.",
    };
};

export default addFavoriteRecipeService;
