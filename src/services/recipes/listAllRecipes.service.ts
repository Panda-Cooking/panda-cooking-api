import AppDataSource from "../../data-source";
import { Recipe } from "../../entities/recipes.entity";

const listAllRecipesService = async (): Promise<Recipe[]> => {
    const recipesRepo = AppDataSource.getRepository(Recipe);

    const allRecipes = await recipesRepo
        .createQueryBuilder("recipes")
        .innerJoinAndSelect("recipes.user", "user")
        .innerJoinAndSelect("recipes.category", "category")
        .innerJoinAndSelect("recipes.imagesRecipes", "imagesRecipes")
        .innerJoinAndSelect("recipes.ingredientsRecipes", "ingredientsRecipes")
        .innerJoinAndSelect("ingredientsRecipes.ingredients", "ingredients")
        .innerJoinAndSelect("recipes.preparations", "preparations")
        .innerJoinAndSelect("recipes.comments", "comments")
        .select([
            "recipes",
            "user.id",
            "user.name",
            "user.email",
            "user.imageProfile",
            "category",
            "imagesRecipes",
            "ingredientsRecipes",
            "ingredients",
            "preparations",
        ])
        .getMany();

    return allRecipes;
};

export default listAllRecipesService;
