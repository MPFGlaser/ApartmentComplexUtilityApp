import axios, { AxiosResponse } from 'axios';
import ApiService from './ApiService';
import { ITicket } from '../interfaces/ticket.interface';
import { TicketStatus } from '../enums/TicketStatus.enum';

class TicketService extends ApiService {
  private url = `${this.baseUrl}/ticket`;

  public async getTickets(retries = 3, delay = 1000): Promise<ITicket[]> {
    try {
      const response: AxiosResponse<ITicket[]> = await axios.get(this.url);
      return response.data;
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.getTickets(retries - 1, delay);
      } else {
        throw error;
      }
    }
  }

  public async getTicketById(id: string) {
    const response: AxiosResponse<ITicket> = await axios.get(
      `${this.url}/${id}`
    );

    return response.data;
  }

  public async getOwnTickets() {
    const response: AxiosResponse<ITicket[]> = await axios.get(
      `${this.url}/by-creator/me`
    );

    return response.data;
  }

  public async getTicketsByCreator(creatorId: string) {
    const response: AxiosResponse<ITicket[]> = await axios.get(
      `${this.url}/by-creator/${creatorId}`
    );

    return response.data;
  }

  public async createTicket(ticket: ITicket) {
    const response = await axios.post(this.url, ticket);

    return response.data;
  }

  public async updateTicket(ticket: ITicket) {
    const response: AxiosResponse<ITicket> = await axios.put(
      `${this.url}/${ticket.id}`,
      ticket
    );

    return response.data;
  }

  public async updateTicketStatus(id: string, status: TicketStatus) {
    const response: AxiosResponse<ITicket> = await axios.put(
      `${this.url}/${id}/status`,
      { status }
    );

    return response.data;
  }

  public async deleteTicket(id: string) {
    const response = await axios.delete(`${this.url}/${id}`);

    return response.data;
  }
}

export default new TicketService();
