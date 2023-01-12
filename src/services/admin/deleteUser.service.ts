import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entity"
import AppError from "../../errors/appError"

export const deleteUserService = async (userId: string): Promise<{message: string}> => {
    const userRepo = AppDataSource.getRepository(User)
    const user = await userRepo.findOneBy({id: userId})

    if(!user) {
        throw new AppError("User not found", 404)
    }

    userRepo.delete({id: userId})
    await userRepo.save(user)

    return {message: "User deleted"}
}