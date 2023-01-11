import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUser, IUserRequest } from "./../interfaces/users/index";

const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required(),
});

const userWithoutPasswordSchema: SchemaOf<IUser> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    isAdm: yup.boolean().required(),
    isActive: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
});

export { userSchema, userWithoutPasswordSchema };
