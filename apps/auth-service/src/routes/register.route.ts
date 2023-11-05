import PromiseRouter from 'express-promise-router';
import { registerController } from '../controllers/register.controller';
import { registerSchema } from '../validators/register.validator';
import { validate } from '@acua/microservice-shared';

const router = PromiseRouter();

router.post('/', ...validate(registerSchema), registerController);

export default router;
