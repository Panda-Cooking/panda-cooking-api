import { iRecipeRequest } from "../../../interfaces/recipes/recipesInterface";

// const mockedRecipeRequest: iRecipeRequest = {
//     name: "Batata frita",
//     description: "A melhor batata frita do mundo",
//     category: "lanches",
//     time: "10",
//     portions: 4,
//     imagesRecipes: [
//         {
//             url: "http://imagem_de_teste.com",
//         },
//     ],
//     ingredients: [
//         {
//             amount: "5",
//             name: "batata",
//         },
//         {
//             amount: "1",
//             name: "sal",
//         },
//     ],
//     preparations: [
//         {
//             description: "corte a batata",
//         },
//         {
//             description: "coloque para fritar",
//         },
//         {
//             description: "adicione o sal",
//         },
//     ],
// };
const mockedRecipeRequest = {
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
            name: "ingredient 2",
        },
        {
            amount: "2",
            name: "ingredient 3",
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
