import * as yup from "yup";
import { iAuthRequest } from "../../interfaces/auth/authInterface";

const authSchemaRequest: yup.SchemaOf<iAuthRequest> = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export { authSchemaRequest };
