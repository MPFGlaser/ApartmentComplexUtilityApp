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
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface EditorProps {}

export function Editor(props: EditorProps) {
  const [fullName, setFullName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleClose = (confirm: boolean) => {
    navigate(-1);

    setOpen(false);
  };

  return (
    <Container>
      <Paper>
        <Box sx={{ my: 2, p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6">Edit Profile</Typography>
          <TextField
            label="Name"
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={{ my: 1 }}
          />
          <TextField
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ my: 1 }}
          />
        </Box>
        <Divider variant="middle" />
        <Box
          sx={{
            my: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
          }}
        >
          <ButtonGroup variant="contained">
            <Button color="primary">Save</Button>
            <Button color="error" onClick={() => setOpen(true)}>
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
        <Dialog
          open={open}
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to cancel and go back?
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
