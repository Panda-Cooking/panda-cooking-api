import * as yup from "yup";
import { iRecipeRequest } from "../../interfaces/recipes/recipesInterface";

const recipesSchema: yup.SchemaOf<iRecipeRequest> = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    category: yup.string().required(),
    time: yup.string().required(),
    portions: yup.number().required(),
    imagesRecipes: yup
        .array()
        .of(
            yup.object({
                url: yup.string().required(),
            })
        )
        .required(),
    ingredients: yup
        .array()
        .of(
            yup.object({
                amount: yup.string().required(),
                name: yup.string().required(),
            })
        )
        .required(),
    preparations: yup
        .array()
        .of(
            yup.object({
                description: yup.string().required(),
            })
        )
        .required(),
});

// const recipesSchemaResponse: yup.SchemaOf<iRecipeRequest> = yup.object({
//     name: yup.string().required(),
//     description: yup.string().required(),
//     category: yup.string().required(),
//     time: yup.string().required(),
//     portions: yup.number().required(),
//     imagesRecipes: yup
//         .array()
//         .of(
//             yup.object({
//                 url: yup.string().required(),
//             })
//         )
//         .required(),
//     ingredients: yup
//         .array()
//         .of(
//             yup.object({
//                 amount: yup.string().required(),
//                 name: yup.string().required(),
//             })
//         )
//         .required(),
//     preparations: yup
//         .array()
//         .of(
//             yup.object({
//                 description: yup.string().required(),
//             })
//         )
//         .required(),
// });

export { recipesSchema };
