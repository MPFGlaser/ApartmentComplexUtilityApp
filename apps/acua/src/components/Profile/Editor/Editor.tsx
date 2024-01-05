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
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '../../../util/AuthProvider';

/* eslint-disable-next-line */
export interface EditorProps {}

export function Editor(props: EditorProps) {
  const { currentUser, getUser } = useAuth();

  const [displayName, setDisplayName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName ?? '');
    }
  }, [currentUser]);

  const handleClose = (confirm: boolean) => {
    if (confirm) {
      navigate(-1);
    }
    setOpen(false);
  };

  const handleSave = async () => {
    if (currentUser) {
      await updateProfile(currentUser, { displayName }).then(() => {
        navigate('/');
      });
      getUser();
    }
  };

  const renderEditorContent = () => {
    if (!currentUser) {
      return (
        <Typography variant="h5" component="h1">
          You must be logged in to view this page.
        </Typography>
      );
    } else {
      return (
        <>
          <Box sx={{ my: 2, p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" component="h1">
              Edit Profile
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              sx={{ my: 1 }}
            />
            <TextField
              disabled
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
              <Button color="primary" onClick={() => handleSave()}>
                Save
              </Button>
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
              <Button
                onClick={() => handleClose(true)}
                color="primary"
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  };

  return (
    <Container>
      <Paper>{renderEditorContent()}</Paper>
    </Container>
  );
}

export default Editor;
