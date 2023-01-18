import * as yup from "yup";
import { ifavoriteRecipesResponse } from "../../interfaces/favoriteRecipes/favoriteRecipes";

const favoriteRecipesSchemaReturned: yup.SchemaOf<ifavoriteRecipesResponse[]> =
    yup
        .array()
        .of(
            yup
                .object({
                    recipe: yup
                        .object({
                            id: yup.string().required(),
                            name: yup.string().required(),
                            description: yup.string().required(),
                            time: yup.string().required(),
                            portions: yup.number().required(),
                        })
                        .required(),
                })
                .required()
        )
        .required();

export { favoriteRecipesSchemaReturned };
