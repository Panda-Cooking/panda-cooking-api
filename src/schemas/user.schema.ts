import * as yup from "yup";
import { SchemaOf } from "yup";
import { iUser, iUserRequest } from "./../interfaces/users/index";

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
    isActive: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
});

export { userSchema, userWithoutPasswordSchema };
