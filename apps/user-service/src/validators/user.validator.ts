import { checkSchema } from 'express-validator';
import { UserClaim } from '../enums/UserClaim.enum';

export const claimGrantSchema = checkSchema({
  targetId: {
    isString: {
      errorMessage: 'Target ID should be a string',
    },
  },
  claims: {
    exists: {
      errorMessage: 'Claims is required',
    },
    isArray: {
      errorMessage: 'Claims should be an array',
    },
    isIn: {
      options: [[UserClaim.Admin, UserClaim.Manager, UserClaim.Staff]],
      errorMessage: 'Claims should be either user, manager, or staff.',
    },
  },
});

export const claimRevokeSchema = checkSchema({
  targetId: {
    isString: {
      errorMessage: 'Target ID should be a string',
    },
  },
  claims: {
    exists: {
      errorMessage: 'Claims is required',
    },
    isArray: {
      errorMessage: 'Claims should be an array',
    },
    isIn: {
      options: [[UserClaim.Admin, UserClaim.Manager, UserClaim.Staff, '*']],
      errorMessage: 'Claims should be either user, manager, staff, or *.',
    },
  },
});
