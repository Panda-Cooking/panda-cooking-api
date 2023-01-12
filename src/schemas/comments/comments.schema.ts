import { Schema } from "inspector";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { iCommentUpdated } from "../../interfaces/comments/commentsInterface";

export const commentsUpdated: SchemaOf<any> = yup.object().shape({
    id: yup.string().notRequired(),
    description: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    recipe: yup.object({
        id: yup.string().notRequired(),
        name: yup.string().notRequired(),
        description: yup.string().notRequired(),
        time: yup.string().notRequired(),
        portions: yup.number().notRequired(),
    }),
    user: yup.object({
        id: yup.string().notRequired(),
        name: yup.string().notRequired(),
        email: yup.string().notRequired(),
        imageProfile: yup.string().notRequired(),
        isAdm: yup.boolean().notRequired(),
    }),
});
