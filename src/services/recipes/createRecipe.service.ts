import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { ImagesRecipes } from "../../entities/imagesRecipes.entity";
import { Ingredients } from "../../entities/ingredients.entity";
import { IngredientsRecipes } from "../../entities/ingredientsRecipes.entity";
import { Preparations } from "../../entities/preparations.entity";
import { Recipe } from "../../entities/recipes.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/appError";
import { iRecipeRequest } from "../../interfaces/recipes/recipesInterface";
import { recipesSchemaResponse } from "../../schemas/recipes/recipesSchema";

const createRecipeService = async (
    userAuthId: string,
    recipeData: iRecipeRequest
) => {
    const recipesRepo = AppDataSource.getRepository(Recipe);
    const categoryRepo = AppDataSource.getRepository(Category);
    const imagesRecipesRepo = AppDataSource.getRepository(ImagesRecipes);
    const ingredientsRecipesRepo =
        AppDataSource.getRepository(IngredientsRecipes);
    const ingredientsRepo = AppDataSource.getRepository(Ingredients);
    const preparationsRepo = AppDataSource.getRepository(Preparations);
    const userRepo = AppDataSource.getRepository(User);

    const categoryRecipe = await categoryRepo.findOneBy({
        name: recipeData.category.toLowerCase(),
    });

    const userAuth = await userRepo.findOneBy({
        id: userAuthId,
    });

    if (!categoryRecipe) {
        throw new AppError("Recipe cannot be registered without category.");
    }

    const newRecipe = recipesRepo.create({
        ...recipeData,
        category: categoryRecipe,
        user: userAuth,
    });

    const newRecipeSaved = await recipesRepo.save(newRecipe);

    recipeData.imagesRecipes.forEach(async (image) => {
        const newImage = imagesRecipesRepo.create({
            ...image,
            recipe: newRecipeSaved,
        });

        await imagesRecipesRepo.save(newImage);
    });

    recipeData.ingredients.forEach(async (ingredient) => {
        const ingredientName = ingredient.name;
        const ingredientAmount = ingredient.amount;

        let findIngredient = await ingredientsRepo.findOneBy({
            name: ingredientName,
        });

        if (!findIngredient) {
            const newIngredient = ingredientsRepo.create({
                name: ingredientName,
            });

            findIngredient = await ingredientsRepo.save(newIngredient);
        }

        const newIngredientToRecipes = ingredientsRecipesRepo.create({
            ingredients: findIngredient,
            recipe: newRecipeSaved,
            amount: ingredientAmount,
        });

        await ingredientsRecipesRepo.save(newIngredientToRecipes);
    });

    recipeData.preparations.forEach(async (preparation) => {
        const newPreparation = preparationsRepo.create({
            ...preparation,
            recipe: newRecipeSaved,
        });

        await preparationsRepo.save(newPreparation);
    });

    newRecipeSaved["ingredients"] = recipeData.ingredients;

    const returnDataRecipe = await recipesSchemaResponse.validate(
        newRecipeSaved,
        {
            stripUnknown: true,
        }
    );

    return returnDataRecipe;
};

export default createRecipeService;
