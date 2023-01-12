import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";

const listUserCreatedRecipesService = async (userId: string) => {
    const userRepository = AppDataSource.getRepository(User);

    const createdRecipes = await userRepository
        .createQueryBuilder("user")
        .innerJoinAndSelect("user.recipes", "userRecipes")
        .where("user.id = :id", { id: userId })
        .getOne();

    return createdRecipes;
};

export default listUserCreatedRecipesService;
