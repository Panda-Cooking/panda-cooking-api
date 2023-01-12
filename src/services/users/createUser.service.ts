import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { User } from "../../entities/users.entity";
import { iUser, iUserRequest } from "./../../interfaces/users/index";
import { userWithoutPasswordSchema } from "../../schemas/users/user.schema";

const createUserService = async (userData: iUserRequest): Promise<iUser> => {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({
        email: userData.email,
    });

    if (findUser) {
        throw new AppError("User already exists!", 409);
    }

    const createdUser = userRepository.create(userData);
    await userRepository.save(createdUser);

    const userWithoutPassword = await userWithoutPasswordSchema.validate(
        createdUser,
        {
            stripUnknown: true,
        }
    );

    return userWithoutPassword;
};

export default createUserService;
