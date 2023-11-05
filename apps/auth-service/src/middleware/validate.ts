import { validationResult } from 'express-validator';

/**
 * Validate a request against a schema
 * Use this as a middleware in express routes
 *
 * Usage: router.post('/', ...validate(customSchema), routeController);
 * @param schema an express-validator schema
 * @returns errors if any, otherwise the next middleware
 */
export const validate = (schema) => {
    return [
        schema,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        },
    ];
};
