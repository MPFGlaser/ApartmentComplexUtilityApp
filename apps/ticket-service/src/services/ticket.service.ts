import { TicketStatus } from '../enums/ticketStatus.enum';
import { ITicket } from '../interfaces/ticket.interface';
import { Ticket } from '../models/Ticket.model';

class TicketService {
  public async getTickets() {
    return Ticket.findAll();
  }

  public async getTicketById(id: string) {
    return Ticket.findByPk(id);
  }

  public async getTicketsByCreator(creatorId: string) {
    return Ticket.findAll({ where: { creator: creatorId } });
  }

  public async createTicket(ticket: ITicket) {
    const createTicket = await Ticket.create({
      creator: ticket.creator,
      location: ticket.location,
      title: ticket.title,
      description: ticket.description,
      status: TicketStatus.Open,
    });
    return createTicket;
  }

  public async updateTicket(id: string, ticket: ITicket) {
    const updateTicket = await Ticket.update(
      {
        title: ticket.title,
        description: ticket.description,
      },
      { where: { id } }
    );
    return updateTicket;
  }

  public async updateTicketStatus(id: string, status: TicketStatus) {
    const updateTicket = await Ticket.update(
      {
        status,
      },
      { where: { id } }
    );
    return updateTicket;
  }

  public async deleteTicket(id: string) {
    const deleteTicket = await Ticket.destroy({ where: { id } });
    return deleteTicket;
  }

  public async anonymiseTicketByCreator(creatorId: string) {
    const anonymiseTicket = await Ticket.update(
      {
        creator: 'anonymous',
      },
      { where: { creator: creatorId } }
    );
    return anonymiseTicket;
  }
}

export default new TicketService();
