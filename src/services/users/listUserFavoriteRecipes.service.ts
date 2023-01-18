import AppDataSource from "../../data-source";
import { FavoriteRecipes } from "../../entities/favoriteRecipes.entity";
import { iFavoriteRecipe } from "../../interfaces/recipes/recipesInterface";

export const listUserFavoriteRecipesService = async (
    userId: string
): Promise<iFavoriteRecipe[]> => {
    const repo = AppDataSource.getRepository(FavoriteRecipes);
    const recipes = await repo
        .createQueryBuilder("favoriteRecipe")
        .innerJoinAndSelect("favoriteRecipe.recipe", "recipe")
        .innerJoinAndSelect("favoriteRecipe.user", "user")
        .select(["favoriteRecipe", "recipe"])
        .where("user.id = :id", { id: userId })
        .getMany();

    return recipes;
};
