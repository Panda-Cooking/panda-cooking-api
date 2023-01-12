import * as yup from "yup";
import {
    iRecipePatchRequest,
    iRecipeRequest,
    iRecipeResponse,
} from "../../interfaces/recipes/recipesInterface";

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
                url: yup.string().url().required(),
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

const recipesPacthSchema: yup.SchemaOf<iRecipePatchRequest> = yup.object({
    name: yup.string(),
    description: yup.string(),
    category: yup.string(),
    time: yup.string(),
    portions: yup.number(),
});

const recipesSchemaResponse: yup.SchemaOf<iRecipeResponse> = yup.object({
    preparations: yup
        .array()
        .of(
            yup.object({
                description: yup.string().required(),
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
    imagesRecipes: yup
        .array()
        .of(
            yup.object({
                url: yup.string().required(),
            })
        )
        .required(),
    user: yup.object({
        id: yup.string().required(),
        name: yup.string().required(),
        email: yup.string().required(),
        imageProfile: yup.string().required(),
        isAdm: yup.boolean().required(),
    }),
    portions: yup.number().required(),
    time: yup.string().required(),
    category: yup.object({
        id: yup.string().required(),
        name: yup.string().required(),
    }),
    description: yup.string().required(),
    name: yup.string().required(),
    id: yup.string().required(),
});

export { recipesSchema, recipesSchemaResponse, recipesPacthSchema };
