import AppDataSource from "../../data-source";
import { ImagesRecipes } from "../../entities/imagesRecipes.entity";
import AppError from "../../errors/appError";
import { iImagesRecipes } from "../../interfaces/imagesRecipes/imagesRecipes";

const addImageOnRecipeService = async (
    newImage: iImagesRecipes,
    recipeId: string,
    userId: string
): Promise<object> => {
    const imagesRecipesRepo = AppDataSource.getRepository(ImagesRecipes);

    const findRecipe = await imagesRecipesRepo.findOne({
        where: {
            recipe: {
                id: recipeId,
            },
        },
        relations: {
            recipe: {
                user: true,
            },
        },
    });

    if (!findRecipe) {
        throw new AppError("Recipe not found", 404);
    }

    const newImageOnRecipe = imagesRecipesRepo.create({
        url: newImage.url,
        recipe: findRecipe.recipe,
    });

    await imagesRecipesRepo.save(newImageOnRecipe);

    return {
        message: "New image added on recipe.",
    };
};

export default addImageOnRecipeService;
