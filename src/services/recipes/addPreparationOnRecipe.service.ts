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
    userId: string,
    newPreparation: iPreparationsRequest
): Promise<iPreparationsResponse> => {
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

    if (findRecipe.user.id !== userId) {
        throw new AppError("User is not author on recipe", 403);
    }

    const preparationCreate = await preparationsRepo.create({
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
