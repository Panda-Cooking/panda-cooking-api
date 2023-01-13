import AppDataSource from "../../data-source";
import { FavoriteRecipes } from "../../entities/favoriteRecipes.entity";

export const listUserFavoriteRecipesService = async (
    userId: string
): Promise<any> => {
    //MUDAR A TIPAGEM ANY ASSIM QUE POSSIVEL
    const recipes = await AppDataSource.createQueryBuilder(
        FavoriteRecipes,
        "favoriteRecipe"
    )
        .innerJoin("favoriteRecipes.recipeId", "recipe")
        .where("favoriteRecipe.userId = :id", { id: userId })
        .getMany();

    return recipes;
};

/*
    const recipesIds = await AppDataSource.createQueryBuilder(FavoriteRecipes, 'favoriteRecipe')
    .select("favoriteRecipe.recipeId").where("favoriteRecipe.userId = :id", {id: userId}).getMany()

    return recipesIds
*/
