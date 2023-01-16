import AppDataSource from "../../data-source";
import { ImagesRecipes } from "../../entities/imagesRecipes.entity";
import AppError from "../../errors/appError";

const deleteImageOnRecipeService = async (
    recipeId: string,
    imageRecipeId: string
): Promise<object> => {
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
        throw new AppError("Recipe or image not found", 404);
    }

    await imagesRecipesRepo.remove(findImageRecipe);

    return {};
};
export default deleteImageOnRecipeService;
