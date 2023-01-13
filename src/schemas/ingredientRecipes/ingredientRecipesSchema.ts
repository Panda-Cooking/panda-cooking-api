import * as yup from "yup";

const ingredientSchema = yup.object({
    ingredients: yup
        .array()
        .of(
            yup
                .object({
                    amount: yup.string().required(),
                    name: yup.string().required(),
                })
                .required()
        )
        .required(),
});

export { ingredientSchema };
