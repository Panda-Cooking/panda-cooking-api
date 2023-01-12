import { iCategoryResponse } from "../categories/categoriesInterface";
import { iImagesRecipes } from "../imagesRecipes/imagesRecipes";
import {
    iIngredientsRecipesRequest,
    iIngredientsRecipesResponse,
} from "../ingredientsRecipes/ingredientsRecipesInterface";
import {
    iPreparationsRequest,
    iPreparationsResponse,
} from "../preparations/preparationsInterface";
import { iUserResponse } from "../users/index";

export interface iRecipeRequest {
    name: string;
    description: string;
    category: string;
    time: string;
    portions: number;
    imagesRecipes: iImagesRecipes[];
    ingredients: iIngredientsRecipesRequest[];
    preparations: iPreparationsRequest[];
}
export interface iRecipePatchRequest {
    name?: string;
    description?: string;
    category?: string;
    time?: string;
    portions?: number;
}

export interface iRecipeResponse {
    id: string;
    name: string;
    description: string;
    time: string;
    portions: number;
    user: iUserResponse;
    category: iCategoryResponse;
    imagesRecipes: iImagesRecipes[];
    ingredients: iIngredientsRecipesResponse[];
    preparations: iPreparationsResponse[];
}
