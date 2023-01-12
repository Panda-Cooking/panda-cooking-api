import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { User } from "../../entities/users.entity";

const deleteUserService = async (userId: string) => {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({
        id: userId,
    });

    if (!findUser) {
        throw new AppError("User not found!", 404);
    }

    await userRepository.remove(findUser);
    return [];
};

export default deleteUserService;
