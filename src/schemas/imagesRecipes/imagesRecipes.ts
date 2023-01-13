import * as yup from "yup";
import { iImagesRecipes } from "../../interfaces/imagesRecipes/imagesRecipes";

const imagesRecipesSchema: yup.SchemaOf<iImagesRecipes> = yup.object({
    url: yup.string().required(),
});

export { imagesRecipesSchema };
