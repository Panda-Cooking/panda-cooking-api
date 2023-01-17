import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import AppError from "../../errors/appError";

const listCategoriesService = async (): Promise<Category[]> => {
    try {
        const categoryRepository = AppDataSource.getRepository(Category);

        const categories = await categoryRepository.find();

        return categories;
    } catch (error) {
        throw new AppError(error.message, 404);
    }
};

export default listCategoriesService;
