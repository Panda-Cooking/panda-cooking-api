import AppDataSource from "../../data-source";
import { FavoriteRecipes } from "../../entities/favoriteRecipes.entity";
import { ifavoriteRecipesResponse } from "../../interfaces/favoriteRecipes/favoriteRecipes";
import { favoriteRecipesSchemaReturned } from "../../schemas/favoriteRecipes/favoriteRecipesSchema";

export const listUserFavoriteRecipesService = async (
    userId: string
): Promise<ifavoriteRecipesResponse[]> => {
    const favoriteRecipesRepo = AppDataSource.getRepository(FavoriteRecipes);

    const recipes = await favoriteRecipesRepo
        .createQueryBuilder("favoriteRecipe")
        .innerJoinAndSelect("favoriteRecipe.recipe", "recipe")
        .innerJoinAndSelect("favoriteRecipe.user", "user")
        .select(["favoriteRecipe", "recipe"])
        .where("user.id = :id", { id: userId })
        .getMany();

    const recipesReturned = await favoriteRecipesSchemaReturned.validate(
        recipes,
        {
            stripUnknown: true,
        }
    );

    return recipesReturned;
};
