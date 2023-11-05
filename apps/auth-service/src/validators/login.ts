import { checkSchema } from 'express-validator';

export const loginSchema = checkSchema({
    email: {
        isEmail: true,
        errorMessage: 'Invalid email',
    },
    password: {
        isLength: {
            errorMessage: 'Password should be at least 8 chars long',
            options: { min: 8 },
        },
    },
});
