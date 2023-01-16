import AppDataSource from "../../data-source";
import { Preparations } from "../../entities/preparations.entity";
import { Recipe } from "../../entities/recipes.entity";
import AppError from "../../errors/appError";
import {
    iPreparationsRequest,
    iPreparationsResponse,
} from "../../interfaces/preparations/preparationsInterface";
import { preparationsSchema } from "../../schemas/preparations/preparationsSchema";

const addPreparationOnRecipeService = async (
    recipeId: string,
    newPreparation: iPreparationsRequest
): Promise<iPreparationsResponse> => {
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

    const removeUserResponse = await preparationsSchema.validate(
        preparationCreate,
        {
            stripUnknown: true,
        }
    );

    return removeUserResponse;
};

export default addPreparationOnRecipeService;
