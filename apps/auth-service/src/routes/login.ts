import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
    res.send({ message: 'Login' });
});

export default router;
