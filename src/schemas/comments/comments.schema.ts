import { Schema } from "inspector";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { iCommentUpdated } from "../../interfaces/comments/commentsInterface";

export const commentsUpdated: SchemaOf<iCommentUpdated> = yup.object().shape({
    id: yup.string(),
    description: yup.string().required(),
    createdAt: yup.date(),
    updatedAt: yup.date(),
    recipe: yup.object({
        id: yup.string(),
        name: yup.string(),
        description: yup.string(),
        time: yup.string(),
        portions: yup.number(),
    }),
    user: yup.object({
        id: yup.string(),
        name: yup.string(),
        email: yup.string(),
        imageProfile: yup.string(),
        isAdm: yup.boolean(),
    }),
});
