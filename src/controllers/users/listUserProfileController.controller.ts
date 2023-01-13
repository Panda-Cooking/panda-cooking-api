import { Request, Response } from "express";
import { listUserProfileService } from "../../services/users/listUserProfileService.service";

export const listUserProfileController = async (
    req: Request,
    res: Response
) => {
    const userProfile = await listUserProfileService(req.userId);
    return res.json(userProfile);
};
