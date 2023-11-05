import PromiseRouter from 'express-promise-router';
import { registerController } from '../controllers/registerController';
import { registerSchema } from '../validators/register';
import { validate } from '../middleware/validate';

const router = PromiseRouter();

router.post('/', ...validate(registerSchema), registerController);

export default router;
