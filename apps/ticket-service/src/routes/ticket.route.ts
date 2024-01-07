import { authenticated, validate } from '@acua/microservice-shared';
import { Router } from 'express';
import {
  createTicketSchema,
  getTicketSchema,
  updateTicketSchema,
  updateTicketStatusSchema,
} from '../validators/ticket.validator';
import TicketService from '../services/ticket.service';
import { ITicket } from '../interfaces/ticket.interface';
import { deleteTicketSchema } from '../validators/ticket.validator';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await TicketService.getTickets();

    if (!result) return res.status(404).send({ message: 'No Tickets found' });

    return res.send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/:id', ...validate(getTicketSchema), async (req, res) => {
  try {
    const result = await TicketService.getTicketById(req.params.id);

    if (!result) return res.status(404).send({ message: 'Ticket not found' });

    return res.send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/by-creator/me', async (req, res) => {
  try {
    const result = await TicketService.getTicketsByCreator(req.body.uid);

    if (!result) return res.status(404).send({ message: 'Ticket not found' });

    return res.send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.get(
  '/by-creator/:creatorId',
  authenticated(['admin']),
  async (req, res) => {
    try {
      const result = await TicketService.getTicketsByCreator(
        req.params.creatorId
      );

      if (!result) return res.status(404).send({ message: 'Ticket not found' });

      return res.send(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  }
);

router.post('/', ...validate(createTicketSchema), async (req, res) => {
  try {
    const TicketToCreate: ITicket = {
      creator: req.body.uid,
      location: req.body.location,
      title: req.body.name,
      description: req.body.description,
    };

    const result = await TicketService.createTicket(TicketToCreate);

    if (!result) return res.status(404).send({ message: 'Ticket not found' });

    return res.send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.put('/:id', ...validate(updateTicketSchema), async (req, res) => {
  try {
    const TicketToUpdate = await TicketService.getTicketById(req.params.id);

    if (!TicketToUpdate)
      return res.status(404).send({ message: 'Ticket not found' });

    if (TicketToUpdate.creator !== req.body.uid)
      return res.status(401).send({ message: 'Unauthorized' });

    const result = await TicketService.updateTicket(req.params.id, req.body);

    return res.send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.put(
  '/:id/status',
  ...validate(updateTicketStatusSchema),
  authenticated(['admin', 'manager', 'staff']),
  async (req, res) => {
    try {
      const TicketToUpdate = await TicketService.getTicketById(req.params.id);

      if (!TicketToUpdate)
        return res.status(404).send({ message: 'Ticket not found' });

      const result = await TicketService.updateTicketStatus(
        req.params.id,
        req.body.status
      );

      return res.send(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  }
);

router.delete('/:id', ...validate(deleteTicketSchema), async (req, res) => {
  try {
    const TicketToDelete = await TicketService.getTicketById(req.params.id);

    if (!TicketToDelete)
      return res.status(404).send({ message: 'Ticket not found' });

    if (TicketToDelete.creator !== req.body.uid)
      return res.status(401).send({ message: 'Unauthorized' });

    const result = await TicketService.deleteTicket(req.params.id);

    return res.send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

export default router;
