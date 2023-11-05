import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema';

/**
 * Validate a request against a schema
 * Use this as a middleware in express routes
 *
 * Usage: router.post('/', ...validate(customSchema), routeController);
 * @param schema an express-validator schema
 * @returns errors if any, otherwise the next middleware
 */
export const validate = (schema: RunnableValidationChains<ValidationChain>) => {
    return [
        schema,
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            return next();
        },
    ];
};
