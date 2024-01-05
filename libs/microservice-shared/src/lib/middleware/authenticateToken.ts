import { NextFunction, Request, Response } from 'express';
import { auth } from '../config/firebase-admin';
import { stdout } from 'process';

export function authenticated(claims?: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const idToken = req.headers['token'];

    if (idToken == null || typeof idToken !== 'string') {
      return res.sendStatus(401); // if there isn't any token
    }

    auth
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        // Verify claims, if required
        if (claims) {
          const hasRequiredClaim = claims.some(
            (claim) => decodedToken[claim] === true
          );
          if (!hasRequiredClaim) {
            return res.sendStatus(403); // if the token does not have the required claim
          }
        }

        // Attach the UID to the request object
        req.body.uid = decodedToken.uid;

        return next(); // pass the execution off to whatever request the client intended
      })
      .catch((error) => {
        stdout.write('\nError verifying ID token:', error);
        return res.sendStatus(403); // if the token is invalid
      });

    return null; // to avoid TS error
  };
}
