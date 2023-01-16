import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { ImagesRecipes } from "../../entities/imagesRecipes.entity";
import { Preparations } from "../../entities/preparations.entity";
import { Recipe } from "../../entities/recipes.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/appError";
import {
    iRecipeRequest,
    iRecipeResponse,
} from "../../interfaces/recipes/recipesInterface";
import { recipesSchemaResponse } from "../../schemas/recipes/recipesSchema";
import createIngredientsService from "./createIngredients.service";

const createRecipeService = async (
    userAuthId: string,
    recipeData: iRecipeRequest
): Promise<iRecipeResponse> => {
    const recipesRepo = AppDataSource.getRepository(Recipe);
    const categoryRepo = AppDataSource.getRepository(Category);
    const imagesRecipesRepo = AppDataSource.getRepository(ImagesRecipes);
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
        await createIngredientsService(ingredient, newRecipeSaved.id);
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
