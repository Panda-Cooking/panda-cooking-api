import { Schema } from "inspector";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { iUser, iUserRequest, iUserUpdate } from "../../interfaces/users/index";

const userSchema: SchemaOf<iUserRequest> = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required(),
    imageProfile: yup.string().required(),
});

const userWithoutPasswordSchema: SchemaOf<iUser> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    isAdm: yup.boolean().required(),
    imageProfile: yup.string()
});

const patchDataSchema: SchemaOf<iUserUpdate> = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
    imageProfile: yup.string()
})

export { userSchema, userWithoutPasswordSchema, patchDataSchema };
