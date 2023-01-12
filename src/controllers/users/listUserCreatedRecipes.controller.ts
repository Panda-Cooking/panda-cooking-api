import { Request, Response } from "express";
import listUserCreatedRecipesService from "../../services/users/listUserCreatedRecipes.service";

const listUserCreatedRecipesController = async (
    request: Request,
    response: Response
) => {
    const createdRecipes = await listUserCreatedRecipesService(request.userId);
    return response.json(createdRecipes);
};

export { listUserCreatedRecipesController };
