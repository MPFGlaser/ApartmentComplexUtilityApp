import { Box, Button, Container, Typography } from '@mui/material';
import Table from '../../components/Tickets/Table/Table';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface TicketOverviewProps {}

type Ticket = {
  id: number;
  title: string;
  author: string;
  date: string;
  updateDate: string;
  status: string;
};

const tickets: Ticket[] = [
  {
    id: 1,
    title: 'Broken sink',
    date: '2021-10-10',
    status: 'Open',
    author: 'John Doe',
    updateDate: '2021-10-10',
  },
];

export function TicketOverview(props: TicketOverviewProps) {
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
