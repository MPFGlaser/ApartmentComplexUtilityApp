import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

/* eslint-disable-next-line */
export interface EditorProps {}

export function Editor(props: EditorProps) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState<ILocation | null>(null);

  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocation = async () => {
      const data = await locationService.getOwnLocation();
      setLocation(data);
    };

    fetchLocation();
  }, []);

  const handleOpen = (action: string) => {
    setAction(action);
    setOpen(true);
  };

  const handleClose = (confirm: boolean) => {
    if (confirm && action === 'clear') {
      handleClear();
    } else if (confirm && action === 'cancel') {
      navigate(-1);
    }

    setOpen(false);
  };

  const handleClear = () => {
    setTitle('');
    setDescription('');
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
              <Button onClick={() => handleOpen('clear')} color="error">
                Clear
              </Button>
              <Button color="error" onClick={() => handleOpen('cancel')}>
                Cancel
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
        <Dialog
          open={open}
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {action === 'clear'
              ? 'Are you sure you want to clear the form?'
              : 'Are you sure you want to cancel and go back?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              All changes will be lost.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(false)} color="primary">
              No
            </Button>
            <Button onClick={() => handleClose(true)} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}

export default Editor;
