import passport from '../middleware/passport.init';
import PromiseRouter from 'express-promise-router';
import { loginController } from '../controllers/loginController';
import { validate } from '@acua/microservice-shared';
import { loginSchema } from '../validators/login';

const router = PromiseRouter();

router.post(
    '/',
    ...validate(loginSchema),
    passport.authenticate('local', { session: false }),
    loginController
);

export default router;
