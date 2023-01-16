import AppDataSource from "../../data-source";
import { Preparations } from "../../entities/preparations.entity";
import AppError from "../../errors/appError";

const deletePreparationOnRecipeService = async (
    recipeId: string,
    preparationId: string
): Promise<object> => {
    const preparationsRepo = AppDataSource.getRepository(Preparations);

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

    await preparationsRepo.remove(findPreparation);

    return {};
};

export default deletePreparationOnRecipeService;
