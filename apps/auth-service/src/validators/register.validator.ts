import { checkSchema } from 'express-validator';
import userService from '../services/user.service';

export const registerSchema = checkSchema({
    firstName: {
        exists: {
            errorMessage: 'First name is required',
        },
        notEmpty: {
            errorMessage: 'First name cannot be empty',
        },
    },
    lastName: {
        exists: {
            errorMessage: 'Last name is required',
        },
        notEmpty: {
            errorMessage: 'Last name cannot be empty',
        },
    },
    email: {
        exists: {
            errorMessage: 'Email is required',
        },
        isEmail: {
            errorMessage: 'Email is not valid',
        },
        custom: {
            options: async (value) => {
                const emailExists = await userService.checkIfEmailExists(value);
                if (emailExists) {
                    throw new Error('Email already in use');
                }
                return true;
            },
        },
    },
    password: {
        exists: {
            errorMessage: 'Password is required',
        },
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars long',
        },
    },
});
