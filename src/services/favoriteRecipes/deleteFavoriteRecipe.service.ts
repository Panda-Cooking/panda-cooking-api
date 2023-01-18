import AppDataSource from "../../data-source";
import { FavoriteRecipes } from "../../entities/favoriteRecipes.entity";
import AppError from "../../errors/appError";

const deleteFavoriteRecipeService = async (
    favoriteRecipeId: string
): Promise<number> => {
    const favoriteRecipesRepo = AppDataSource.getRepository(FavoriteRecipes);

    const findFavoriteRecipe = await favoriteRecipesRepo.findOneBy({
        id: favoriteRecipeId,
    });

    if (!findFavoriteRecipe) {
        throw new AppError("favorite Recipe not found!", 404);
    }

    await favoriteRecipesRepo.delete({ id: favoriteRecipeId });
    return 204;
};

export default deleteFavoriteRecipeService;
