import { iImagesRecipes } from "../../../interfaces/imagesRecipes/imagesRecipes";
import { iIngredientsRecipesRequest } from "../../../interfaces/ingredientsRecipes/ingredientsRecipesInterface";
import {
    iRecipePatchRequest,
    iRecipeRequest,
} from "../../../interfaces/recipes/recipesInterface";

const mockedRecipeRequest: iRecipeRequest = {
    name: "receita de teste",
    description: "essa descrição é um teste",
    category: "lanches",
    time: "25",
    portions: 4,
    imagesRecipes: [
        {
            url: "http://urldeteste1.com",
        },
        {
            url: "http://urldeteste2.com",
        },
    ],
    ingredients: [
        {
            amount: "1/2",
            name: "ingredient2",
        },
        {
            amount: "2",
            name: "ingredient3",
        },
    ],
    preparations: [
        {
            description: "modo de preparo 1",
        },
        {
            description: "modo de preparo 2",
        },
    ],
};

const mockedRecipeUpdateRequest: iRecipePatchRequest = {
    name: "receita de teste atualizada",
    description: "essa descrição é um teste atualizado",
    time: "20",
    portions: 4,
};

const mockedImagesRecipesRequest: iImagesRecipes = {
    url: "http://urldeteste.com",
};

const mockedImagesRecipesUpdateRequest: iImagesRecipes = {
    url: "http://urlatualizadadeteste.com",
};

const mockedIngredientsRequest = {
    ingredients: [
        {
            amount: "1/2",
            name: "ingredient4",
        },
        {
            amount: "1/2",
            name: "ingredient5",
        },
    ],
};

export {
    mockedRecipeRequest,
    mockedRecipeUpdateRequest,
    mockedImagesRecipesRequest,
    mockedImagesRecipesUpdateRequest,
    mockedIngredientsRequest,
};
