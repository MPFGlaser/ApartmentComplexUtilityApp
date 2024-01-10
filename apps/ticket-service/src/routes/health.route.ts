import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'ticket-service is healthy' });
});

export default router;
