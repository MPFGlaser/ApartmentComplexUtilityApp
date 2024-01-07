import { Box, Button, Container, Typography } from '@mui/material';
import Table from '../../components/Tickets/Table/Table';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ticketService from '../../services/ticket.service';
import { ITicket } from '../../interfaces/ticket.interface';

/* eslint-disable-next-line */
export interface TicketOverviewProps {}

export function TicketOverview(props: TicketOverviewProps) {
  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    ticketService
      .getTickets()
      .then((response) => {
        setTickets(response);
      })
      .catch((error) => {
        console.error('Error fetching tickets', error);
      });
  }, []);

  return (
    <Container>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}
      >
        <Typography variant="h5" sx={{ my: 1 }}>
          Repair Requests
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ my: 1, ml: 'auto' }}
          component={Link}
          to="/tickets/create"
        >
          New
        </Button>
      </Box>
      <Table tickets={tickets} />
    </Container>
  );
}

export default TicketOverview;
