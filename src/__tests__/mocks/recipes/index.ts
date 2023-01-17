import { iRecipeRequest } from "../../../interfaces/recipes/recipesInterface";

const mockedRecipeRequest: iRecipeRequest = {
    name: "receita de teste 2",
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

export { mockedRecipeRequest };
