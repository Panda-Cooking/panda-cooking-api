import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { iUserResponse } from "../../interfaces/users";

export const listUserProfileService = async (
    userId: string
): Promise<iUserResponse> => {
    const userProfile = await AppDataSource.createQueryBuilder(User, "user")
        .select("user.id")
        .addSelect("user.name")
        .addSelect("user.email")
        .addSelect("user.imageProfile")
        .addSelect("user.isAdm")
        .where("user.id = :id", { id: userId })
        .getOne();

    return userProfile;
};
