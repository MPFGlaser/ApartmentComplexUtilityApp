import { authenticated, validate } from '@acua/microservice-shared';
import { Router } from 'express';
import { locationSchema } from '../validators/location.validator';
import locationService from '../services/location.service';
import { ILocation } from '../interfaces/location.interface';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await locationService.getLocations();

    if (!result) return res.status(404).send({ message: 'No locations found' });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await locationService.getLocationById(req.params.id);

    if (!result) return res.status(404).send({ message: 'Location not found' });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/by-owner/me', async (req, res) => {
  try {
    const result = await locationService.getLocationByOwner(req.body.uid);

    if (!result) return res.status(404).send({ message: 'Location not found' });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.get(
  '/by-owner/:ownerId',
  authenticated(['admin']),

  async (req, res) => {
    try {
      const result = await locationService.getLocationByOwner(
        req.params.ownerId
      );

      if (!result)
        return res.status(404).send({ message: 'Location not found' });

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  }
);

router.post('/', ...validate(locationSchema), async (req, res) => {
  try {
    const locationToCreate: ILocation = {
      owner: req.body.uid,
      name: req.body.name,
    };

    const result = await locationService.createLocation(locationToCreate);

    if (!result) return res.status(404).send({ message: 'Location not found' });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.put('/:id', ...validate(locationSchema), async (req, res) => {
  try {
    const locationToUpdate = await locationService.getLocationById(
      req.params.id
    );

    if (!locationToUpdate)
      return res.status(404).send({ message: 'Location not found' });

    if (locationToUpdate.owner !== req.body.uid)
      return res.status(401).send({ message: 'Unauthorized' });

    const result = await locationService.updateLocation(
      req.params.id,
      req.body
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const locationToDelete = await locationService.getLocationById(
      req.params.id
    );

    if (!locationToDelete)
      return res.status(404).send({ message: 'Location not found' });

    if (locationToDelete.owner !== req.body.uid)
      return res.status(401).send({ message: 'Unauthorized' });

    const result = await locationService.deleteLocation(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

export default router;
