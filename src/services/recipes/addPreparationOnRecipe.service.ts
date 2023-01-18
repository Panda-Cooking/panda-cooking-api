import AppDataSource from "../../data-source";
import { Preparations } from "../../entities/preparations.entity";
import { Recipe } from "../../entities/recipes.entity";
import AppError from "../../errors/appError";
import {
    iPreparationsRequest,
    iPreparationsResponse,
} from "../../interfaces/preparations/preparationsInterface";

const addPreparationOnRecipeService = async (
    recipeId: string,
    newPreparation: iPreparationsRequest
): Promise<object> => {
    const recipeRepo = AppDataSource.getRepository(Recipe);
    const preparationsRepo = AppDataSource.getRepository(Preparations);

    const findRecipe = await recipeRepo.findOne({
        where: {
            id: recipeId,
        },
    });

    if (!findRecipe) {
        throw new AppError("Recipe not found", 404);
    }

    const preparationCreate = preparationsRepo.create({
        description: newPreparation.description,
        recipe: findRecipe,
    });

    await preparationsRepo.save(preparationCreate);

    return {
        message: "Mode preparation added",
    };
};

export default addPreparationOnRecipeService;
