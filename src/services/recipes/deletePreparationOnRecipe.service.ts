import AppDataSource from "../../data-source";
import { Preparations } from "../../entities/preparations.entity";
import AppError from "../../errors/appError";

const deletePreparationOnRecipeService = async (
    recipeId: string,
    preparationId: string,
    userId: string
): Promise<object> => {
    const preparationsRepo = AppDataSource.getRepository(Preparations);

    const findPreparation = await preparationsRepo.findOne({
        where: {
            id: preparationId,
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

    if (!findPreparation) {
        throw new AppError("Preparation not found", 404);
    }

    if (findPreparation.recipe.user.id !== userId) {
        throw new AppError("User is not author on recipe", 403);
    }

    await preparationsRepo.remove(findPreparation);

    return {};
};

export default deletePreparationOnRecipeService;
