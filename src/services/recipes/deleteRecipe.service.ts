import AppDataSource from "../../data-source";
import { Recipe } from "../../entities/recipes.entity";
import AppError from "../../errors/appError";

const deleteRecipeService = async (recipeId: string): Promise<{}> => {
    const recipeRepo = AppDataSource.getRepository(Recipe);

    const findRecipe = await recipeRepo.findOneBy({
        id: recipeId,
    });

    if (!findRecipe) {
        throw new AppError("Recipe not found", 404);
    }

    await recipeRepo.remove(findRecipe);

    return {};
};
export default deleteRecipeService;
