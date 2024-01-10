import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import ticketService from '../../../services/ticket.service';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import locationService from '../../../services/location.service';
import { ILocation } from '../../../interfaces/location.interface';
import { useDialog } from '../../../util/DialogContext';
import { useSnackbar } from '../../../util/SnackbarContext';

/* eslint-disable-next-line */
export interface EditorProps {}

export function Editor(props: EditorProps) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState<ILocation | null>(null);

  const navigate = useNavigate();
  const showDialog = useDialog();
  const showSnackbar = useSnackbar();

  useEffect(() => {
    const fetchLocation = async () => {
      const data = await locationService.getOwnLocation();
      setLocation(data);
    };

    fetchLocation();
  }, []);

  const openClearDialog = () => {
    showDialog({
      title: 'Are you sure you want to clear the form?',
      content: 'All changes will be lost.',
      buttons: [
        {
          id: 'cancel',
          text: 'No',
        },
        {
          id: 'confirm',
          text: 'Yes',
          color: 'error',
          callback: () => {
            setTitle('');
            setDescription('');
          },
        },
      ],
    });
  };

  const openCancelDialog = () => {
    showDialog({
      title: 'Are you sure you want to cancel and go back?',
      content: 'All changes will be lost.',
      buttons: [
        {
          id: 'cancel',
          text: 'No',
        },
        {
          id: 'confirm',
          text: 'Yes',
          color: 'error',
          callback: () => navigate(-1),
        },
      ],
    });
  };

  const handleSave = () => {
    if (!title || !description || !location?.id) {
      return;
    }
    ticketService.createTicket({
      title,
      description,
      location: location?.id,
    });
    showSnackbar({
      message: 'Repair request created',
      severity: 'success',
    });
    navigate(-1);
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
          <Typography variant="h4">New Repair Request</Typography>
          <Divider variant="middle" />
          <Box sx={{ my: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">Repair Request Details</Typography>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ my: 1 }}
            />
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
          <Box sx={{ my: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">Description</Typography>
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ my: 1 }}
            />
          </Box>
          <Divider variant="middle" />
          <Box
            sx={{
              my: 2,
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
            }}
          >
            <ButtonGroup variant="contained">
              <Button color="primary" onClick={() => handleSave()}>
                Save
              </Button>
              <Button onClick={() => openClearDialog()} color="error">
                Clear
              </Button>
              <Button color="error" onClick={() => openCancelDialog()}>
                Cancel
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Editor;
