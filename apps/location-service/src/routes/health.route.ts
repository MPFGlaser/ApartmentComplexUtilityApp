import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send({ message: 'location-service is healthy' });
});

export default router;
