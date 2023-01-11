import { iCategory } from "../categories/categoriesInterface";
import { iImagesRecipesRequest } from "../imagesRecipes/imagesRecipes";
import { iIngredientsRecipesRequest } from "../ingredientsRecipes/ingredientsRecipesInterface";
import { iPreparationsRequest } from "../preparations/preparationsInterface";
import { iUserResponse } from "../users/index";

export interface iRecipeRequest {
    name: string;
    description: string;
    category: string;
    time: string;
    portions: number;
    imagesRecipes: iImagesRecipesRequest[];
    ingredients: iIngredientsRecipesRequest[];
    preparations: iPreparationsRequest[];
}

// export interface iRecipeResponse {
//     id: string;
//     name: string;
//     description: string;
//     time: string;
//     portions: number;
//     user: iUserResponse;
//     category: iCategory;
//     imagesRecipes;
// }
