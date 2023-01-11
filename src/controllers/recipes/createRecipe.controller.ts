import { Request, Response } from "express";

export const createRecipeController = async (req: Request, res: Response) => {
    const newRecipe = undefined;

    return res.status(201).json(newRecipe);
};
