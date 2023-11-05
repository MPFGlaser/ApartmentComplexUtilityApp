import { checkSchema } from 'express-validator';

export const loginSchema = checkSchema({
    email: {
        exists: {
            errorMessage: 'Email is required',
        },
        isEmail: {
            errorMessage: 'Email is not valid',
        },
    },
    password: {
        exists: {
            errorMessage: 'Password is required',
        },
        isLength: {
            errorMessage: 'Password should be at least 8 chars long',
            options: { min: 8 },
        },
    },
});
