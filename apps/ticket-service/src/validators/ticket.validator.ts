import { checkSchema } from 'express-validator';

export const getTicketSchema = checkSchema({
  id: {
    exists: {
      errorMessage: 'Ticket ID is required',
    },
    isString: {
      errorMessage: 'Ticket ID should be a string',
    },
  },
});

export const createTicketSchema = checkSchema({
  location: {
    exists: {
      errorMessage: 'Location is required',
    },
    isString: {
      errorMessage: 'Location should be a string',
    },
  },
  title: {
    exists: {
      errorMessage: 'Title is required',
    },
    isString: {
      errorMessage: 'Title should be a string',
    },
  },
  description: {
    exists: {
      errorMessage: 'Description is required',
    },
    isString: {
      errorMessage: 'Description should be a string',
    },
  },
});

export const updateTicketSchema = checkSchema({
  title: {
    optional: true,
    isString: {
      errorMessage: 'Title should be a string',
    },
  },
  description: {
    optional: true,
    isString: {
      errorMessage: 'Description should be a string',
    },
  },
});

export const updateTicketStatusSchema = checkSchema({
  status: {
    exists: {
      errorMessage: 'Status is required',
    },
    isString: {
      errorMessage: 'Status should be a string',
    },
  },
});
