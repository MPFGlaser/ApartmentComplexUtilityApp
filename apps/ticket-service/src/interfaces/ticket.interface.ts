import { TicketStatus } from '../enums/ticketStatus.enum';

export interface ITicket {
  id?: string;
  creator: string;
  location: string;
  title?: string;
  description?: string;
  status?: TicketStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
