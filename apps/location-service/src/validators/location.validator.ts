import { checkSchema } from 'express-validator';

export const locationSchema = checkSchema({
  name: {
    exists: {
      errorMessage: 'Location name is required',
    },
    isString: {
      errorMessage: 'Name should be a string',
    },
  },
});
