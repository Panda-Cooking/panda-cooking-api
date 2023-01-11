import { iImagesRecipes } from "../imagesRecipes/imagesRecipes";
import { iIngredientsRecipes } from "../ingredientsRecipes/ingredientsRecipesInterface";
import { iPreparations } from "../preparations/preparationsInterface";

export interface iRecipeRequest {
    name: string;
    description: string;
    time: string;
    portions: number;
    categoryId: string;
    imagesRecipes: iImagesRecipes[];
    ingredientsRecipes: iIngredientsRecipes[];
    preparations: iPreparations[];
}
