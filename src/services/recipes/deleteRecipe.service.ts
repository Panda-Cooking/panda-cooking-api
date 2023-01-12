import AppDataSource from "../../data-source";
import { Recipe } from "../../entities/recipes.entity";
import AppError from "../../errors/appError";

const deleteRecipeService = async (
    userId: string,
    recipeId: string
): Promise<{}> => {
    const recipeRepo = AppDataSource.getRepository(Recipe);

    const findRecipe = await recipeRepo.findOne({
        where: {
            id: recipeId,
            user: {
                id: userId,
            },
        },
        relations: {
            user: true,
        },
    });

    if (!findRecipe) {
        throw new AppError(
            "Recipe not found / User can only delete their own recipes",
            404
        );
    }

    await recipeRepo.remove(findRecipe);

    return {};
};
export default deleteRecipeService;
