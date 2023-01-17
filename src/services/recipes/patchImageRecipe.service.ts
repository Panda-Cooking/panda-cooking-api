import AppDataSource from "../../data-source";
import { ImagesRecipes } from "../../entities/imagesRecipes.entity";
import AppError from "../../errors/appError";
import { iImagesRecipes } from "../../interfaces/imagesRecipes/imagesRecipes";

const patchImageRecipeService = async (
    recipeId: string,
    imageRecipeId: string,
    newImage: iImagesRecipes
): Promise<ImagesRecipes> => {
    const imagesRecipesRepo = AppDataSource.getRepository(ImagesRecipes);

    const findImageRecipe = await imagesRecipesRepo.findOne({
        where: {
            id: imageRecipeId,
            recipe: {
                id: recipeId,
            },
        },
    });

    if (!findImageRecipe) {
        throw new AppError("Image or recipe not found", 404);
    }

    const imagesRecipeUpdated = await imagesRecipesRepo.save({
        ...findImageRecipe,
        url: newImage.url,
    });

    return imagesRecipeUpdated;
};

export default patchImageRecipeService;
