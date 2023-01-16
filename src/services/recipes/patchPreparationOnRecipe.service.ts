import AppDataSource from "../../data-source";
import { Preparations } from "../../entities/preparations.entity";
import { Recipe } from "../../entities/recipes.entity";
import AppError from "../../errors/appError";
import { iPreparationsRequest } from "../../interfaces/preparations/preparationsInterface";

const patchPreparationOnRecipeService = async (
    recipeId: string,
    preparationId: string,
    dataPreparation: iPreparationsRequest,
    userId: string
) => {
    const recipeRepo = AppDataSource.getRepository(Recipe);
    const preparationsRepo = AppDataSource.getRepository(Preparations);

    const findRecipe = await recipeRepo.findOne({
        where: {
            id: recipeId,
        },
        relations: {
            user: true,
        },
    });

    if (!findRecipe) {
        throw new AppError("Recipe not found", 404);
    }

    const findPreparation = await preparationsRepo.findOne({
        where: {
            id: preparationId,
            recipe: {
                id: recipeId,
            },
        },
    });

    if (!findPreparation) {
        throw new AppError("Preparation not found", 404);
    }

    const preparationSaved = await preparationsRepo.save({
        ...findPreparation,
        description: dataPreparation.description,
    });

    return preparationSaved;
};

export default patchPreparationOnRecipeService;
