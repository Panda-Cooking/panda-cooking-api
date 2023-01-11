import { iImagesRecipesRequest } from "../imagesRecipes/imagesRecipes";
import { iIngredientsRecipesRequest } from "../ingredientsRecipes/ingredientsRecipesInterface";
import { iPreparationsRequest } from "../preparations/preparationsInterface";

export interface iRecipeRequest {
    name: string;
    description: string;
    category: string;
    time: string;
    portions: number;
    imagesRecipes: iImagesRecipesRequest[];
    ingredientsRecipes: iIngredientsRecipesRequest[];
    preparations: iPreparationsRequest[];
}
