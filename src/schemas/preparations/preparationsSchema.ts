import * as yup from "yup";
import { iPreparationsRequest } from "../../interfaces/preparations/preparationsInterface";

const preparationsSchema: yup.SchemaOf<iPreparationsRequest> = yup.object({
    description: yup.string().required(),
});

export { preparationsSchema };
