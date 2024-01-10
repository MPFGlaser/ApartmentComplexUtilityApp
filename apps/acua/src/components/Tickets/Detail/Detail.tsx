/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ITicket } from '../../../interfaces/ticket.interface';
import ticketService from '../../../services/ticket.service';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TicketStatus } from '../../../enums/TicketStatus.enum';
import { useAuth } from '../../../util/AuthProvider';
import locationService from '../../../services/location.service';
import { ILocation } from '../../../interfaces/location.interface';
import userService from '../../../services/user.service';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDialog } from '../../../util/DialogContext';
import { useSnackbar } from '../../../util/SnackbarContext';

/* eslint-disable-next-line */
export interface DetailProps {}

export function Detail(props: DetailProps) {
  const [ticket, setTicket] = useState<ITicket | null>(null);
  const [location, setLocation] = useState<ILocation | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [userIsPrivileged, setUserIsPrivileged] = useState(false);

  const { id } = useParams<{ id: string }>();
  const { userHasClaim } = useAuth();
  const navigate = useNavigate();
  const showDialog = useDialog();
  const showSnackbar = useSnackbar();

  const statusTexts = {
    open: 'Open',
    pending: 'Pending',
    inprogress: 'In Progress',
    completed: 'Completed',
    wontfix: "Won't Fix",
  };

  useEffect(() => {
    const fetchTicket = async () => {
      if (!id) {
        return;
      }
      const data = await ticketService.getTicketById(id);
      setTicket(data);
    };

    fetchTicket();
  }, [id]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (ticket?.location) {
        const data = await locationService.getLocationById(ticket.location);
        setLocation(data);
      }
    };

    fetchLocation();

    const fetchDisplayName = async () => {
      if (ticket?.creator) {
        const data = await userService.getDisplayNameByUid(ticket.creator);
        setDisplayName(data);
      }
    };

    fetchDisplayName();
  }, [ticket]);

  useEffect(() => {
    (async () => {
      const result = await userHasClaim(['admin', 'manager', 'staff']);
      setUserIsPrivileged(result);
    })();
  });

  const handleStatusChange = async (event: SelectChangeEvent<TicketStatus>) => {
    const newStatus = event.target.value as TicketStatus;

    if (!id || !ticket) {
      return;
    }
    await ticketService.updateTicketStatus(id, newStatus);

    setTicket({ ...ticket, status: newStatus });
  };

  const handleDelete = async () => {
    if (!id) {
      return;
    }

    showDialog({
      title: 'Delete ticket',
      content: 'Are you sure you want to delete this ticket?',
      buttons: [
        {
          id: 'cancel',
          text: 'No',
        },
        {
          id: 'confirm',
          text: 'Yes',
          color: 'error',
          callback: async () => {
            await ticketService.deleteTicket(id);
            showSnackbar({
              message: 'Repair request deleted',
              severity: 'success',
            });
            navigate(-1);
          },
        },
      ],
    });
  };

  return (
    <Container>
      <Paper>
        <Box
          sx={{
            my: 2,
            p: 2,
          }}
        >
          <Typography variant="h4">{ticket?.title}</Typography>
          <Divider variant="middle" />
          <Box sx={{ my: 2 }}>
            <Typography variant="h6">Repair Request Details</Typography>
            <Typography variant="body1">
              Status: {ticket?.status ? statusTexts[ticket.status] : ''}
            </Typography>
            <Typography variant="body1">
              Created on:{' '}
              {ticket?.createdAt
                ? new Date(ticket.createdAt).toLocaleString('en-GB')
                : ''}
            </Typography>
            <Typography variant="body1">
              Last updated:{' '}
              {ticket?.updatedAt
                ? new Date(ticket.updatedAt).toLocaleString('en-GB')
                : ''}
            </Typography>
            <Typography variant="body1">
              From:{' '}
              {displayName ?? (
                <Box component="span" display="inline-block">
                  <Skeleton width={100} />
                </Box>
              )}
            </Typography>
            <Typography variant="body1">
              Location:{' '}
              {location ? (
                location.name
              ) : (
                <Box component="span" display="inline-block">
                  <Skeleton width={100} />
                </Box>
              )}
            </Typography>
          </Box>
          <Divider variant="middle" />
          <Box sx={{ my: 2 }}>
            <Typography variant="h6">Description</Typography>
            <p>{ticket?.description}</p>
          </Box>

          {userIsPrivileged ? (
            <Box>
              <Divider variant="middle" />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <FormControl
                  sx={{
                    my: 2,
                    ml: 'auto',
                    width: 200,
                  }}
                >
                  <InputLabel id="ticket-status-select-label">
                    Status
                  </InputLabel>
                  <Select
                    labelId="ticket-status-select-label"
                    id="ticket-status-select"
                    value={ticket?.status || ''}
                    label="Status"
                    onChange={handleStatusChange}
                  >
                    {Object.entries(statusTexts).map(([value, text]) => (
                      <MenuItem value={value} key={value}>
                        {text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton aria-label="delete" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Box>{' '}
            </Box>
          ) : null}
        </Box>
      </Paper>
    </Container>
  );
}

export default Detail;
