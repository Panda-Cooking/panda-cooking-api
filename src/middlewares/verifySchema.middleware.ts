import { NextFunction, Request, Response } from "express";
import { AnyObjectSchema } from "yup";
import ValidationError from "yup/lib/ValidationError";

export const verifySchemaMiddleware =
    (schema: AnyObjectSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedBody = await schema.validate(req.body, {
                stripUnknown: true,
                abortEarly: false,
            });

            req.body = validatedBody;

            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({
                    message: error.errors,
                });
            }
        }
    };
