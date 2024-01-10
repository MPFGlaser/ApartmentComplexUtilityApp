import { auth, authenticated, validate } from '@acua/microservice-shared';
import { Router } from 'express';
import userService from '../services/user.service';
import { UserClaim } from '../enums/UserClaim.enum';
import {
  claimGrantSchema,
  claimRevokeSchema,
} from '../validators/user.validator';

const router = Router();

router.get(
  '/get-all',
  authenticated([UserClaim.Admin, UserClaim.Manager, UserClaim.Staff]),
  async (req, res) => {
    try {
      const result = await userService.getAllUsers();

      if (!result) return res.status(404).send({ message: 'No Users found' });

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  }
);

router.get(
  '/get-privileged',
  authenticated([UserClaim.Admin, UserClaim.Manager]),
  async (req, res) => {
    try {
      const result = await userService.getPrivilegedUsers();

      if (!result) return res.status(404).send({ message: 'No Users found' });

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  }
);

router.get('/:uid/display-name', authenticated(), async (req, res) => {
  try {
    const user = await auth.getUser(req.params.uid);

    if (!user) return res.status(404).send({ message: 'User not found' });

    return res.status(200).json({ name: user.displayName });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.post(
  '/grant-claim',
  authenticated([UserClaim.Admin, UserClaim.Manager]),
  ...validate(claimGrantSchema),
  async (req, res) => {
    try {
      const claimsToGrant = req.body.claims;
      const target = req.body.targetId || req.user.uid;

      if (!target || !claimsToGrant)
        return res.status(400).send({ message: 'Bad request' });

      await userService.grantClaims(target, claimsToGrant);

      return res.status(200).json({ message: 'Role(s) granted' });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  }
);

router.delete(
  '/revoke-claim',
  ...validate(claimRevokeSchema),
  authenticated([UserClaim.Admin, UserClaim.Manager]),
  async (req, res) => {
    try {
      const claimsToRevoke = req.body.claims;
      const target = req.body.targetId || req.body.uid;

      if (!target || !claimsToRevoke)
        return res.status(400).send({ message: 'Bad request' });

      const user = await auth.getUser(target);

      if (!user) return res.status(404).send({ message: 'User not found' });

      if (claimsToRevoke.includes('*')) {
        await auth.setCustomUserClaims(target, null);
      } else {
        const userClaims = user.customClaims || {};
        claimsToRevoke.forEach((claim: string) => {
          delete userClaims[claim];
        });
        await auth.setCustomUserClaims(target, userClaims);
      }

      return res.status(200).json({ message: 'Role revoked' });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  }
);

router.delete('/delete-my-data', authenticated(), async (req, res) => {
  try {
    await userService.handleDeleteUserDataRequest(req.body.uid);

    return res
      .status(200)
      .json({ message: 'User data delete request received' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

export default router;
