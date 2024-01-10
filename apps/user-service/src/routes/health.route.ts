import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'user-service is healthy' });
});

export default router;
