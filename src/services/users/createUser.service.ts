import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { User } from "../../entities/users.entity";
import { IUser, IUserRequest } from "./../../interfaces/users/index";
import { userWithoutPasswordSchema } from "../../schemas/user.schema";

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({
        email: userData.email,
    });

    if (findUser) {
        throw new AppError("User already exists!", 409);
    }

    const createdUser = userRepository.create(userData);
    userRepository.save(createdUser);

    const userWithoutPassword = await userWithoutPasswordSchema.validate(
        createdUser,
        {
            stripUnknown: true,
        }
    );

    return userWithoutPassword;
};

export default createUserService;
