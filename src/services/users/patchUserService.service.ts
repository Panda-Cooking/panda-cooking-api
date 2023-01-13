import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { iUserResponse, iUserUpdate } from "../../interfaces/users";
import { userWithoutPasswordSchema } from "../../schemas/users/user.schema";
import { hash } from "bcryptjs";

export const patchUserService = async (
    userId: string,
    userData: iUserUpdate
): Promise<iUserResponse> => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });

    if (userData.name) {
        user.name = userData.name;
    }
    if (userData.email) {
        user.email = userData.email;
    }
    if (userData.password) {
        user.password = await hash(userData.password, 10);
    }
    if (userData.imageProfile) {
        user.imageProfile = userData.imageProfile;
    }

    await userRepo.save(user);

    const returnContent = await userWithoutPasswordSchema.validate(user, {
        stripUnknown: true,
    });

    return returnContent;
};
