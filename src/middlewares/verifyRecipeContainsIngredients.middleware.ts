import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { IngredientsRecipes } from "../entities/ingredientsRecipes.entity";
import { iIngredientsRecipesRequest } from "../interfaces/ingredientsRecipes/ingredientsRecipesInterface";

const verifyRecipeContainsIngredientsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const ingredientsRecipesRepo =
        AppDataSource.getRepository(IngredientsRecipes);

    const ingredientList: iIngredientsRecipesRequest[] = req.body.ingredients;
    const recipeId: string = req.params.id;

    for (let i = 0; i < ingredientList.length; i++) {
        const ingredientName = ingredientList[i].name.toLowerCase();

        const findIngredientOnRecipe = await ingredientsRecipesRepo.findOne({
            where: {
                ingredients: {
                    name: ingredientName,
                },
                recipe: {
                    id: recipeId,
                },
            },
            relations: {
                recipe: true,
            },
        });

        if (findIngredientOnRecipe) {
            return res.status(409).json({
                message: "Recipe already has ingredient",
            });
        }
    }

    return next();
};

export default verifyRecipeContainsIngredientsMiddleware;
