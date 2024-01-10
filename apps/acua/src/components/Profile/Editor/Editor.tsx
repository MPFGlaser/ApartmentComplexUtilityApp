import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '../../../util/AuthProvider';
import { ILocation } from '../../../interfaces/location.interface';
import locationService from '../../../services/location.service';
import { useSnackbar } from '../../../util/SnackbarContext';
import userService from '../../../services/user.service';
import { useDialog } from '../../../util/DialogContext';

/* eslint-disable-next-line */
export interface EditorProps {}

export function Editor(props: EditorProps) {
  const { currentUser, getUser, signOut } = useAuth();

  const [displayName, setDisplayName] = React.useState('');
  const [location, setLocation] = React.useState<ILocation | null>(null); // [location, setLocation
  const [locationName, setLocationName] = React.useState('');

  const showSnackbar = useSnackbar();
  const showDialog = useDialog();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName ?? '');

      locationService.getOwnLocation().then((locationData) => {
        setLocation(locationData);
        setLocationName(locationData.name ?? '');
      });
    }
  }, [currentUser]);

  const handleCancelButton = () => {
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

  const handleDeleteButton = () => {
    showDialog({
      title: 'Are you sure you want to delete your account?',
      content: [
        'Your personal data will be permanently deleted and repair requests will be anonymised.',
        'This action cannot be undone.',
      ],
      buttons: [
        {
          id: 'cancel',
          text: 'No, take me back',
        },
        {
          id: 'confirm',
          text: 'Yes, delete my account',
          color: 'error',
          callback: () => RequestDeletion(),
        },
      ],
    });
  };

  const RequestDeletion = () => {
    userService
      .requestAccountDeletion()
      .then(() => {
        // Delete data
        showSnackbar({
          message: 'Account deletion requested.',
          severity: 'success',
          duration: 5000,
        });
        signOut();
        navigate('/');
      })
      .catch(() => {
        showSnackbar({
          message: 'Something went wrong. Please try again later.',
          severity: 'error',
          duration: 5000,
        });
      });
  };

  const handleSave = async () => {
    if (currentUser) {
      try {
        // Update location data
        if (location) {
          // Update existing location
          await locationService.updateLocation({
            ...location,
            name: locationName,
          });
        } else {
          // Create new location if it doesn't exist
          await locationService.createLocation({ name: locationName });
        }

        // Update user data
        await updateProfile(currentUser, { displayName }).then(() => {
          showSnackbar({
            message: 'Profile updated',
            severity: 'success',
            duration: 5000,
          });
          navigate('/');
        });
        getUser();
      } catch (error) {
        showSnackbar({
          message: 'Something went wrong. Please try again later.',
          severity: 'error',
          duration: 5000,
        });
        console.error(error);
        // Handle the error appropriately here
      }
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
              label="Location"
              variant="outlined"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
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
              justifyContent: 'space-between',
            }}
          >
            <ButtonGroup variant="contained">
              <Button color="primary" onClick={() => handleSave()}>
                Save
              </Button>
              <Button color="error" onClick={() => handleCancelButton()}>
                Cancel
              </Button>
            </ButtonGroup>
            <Button color="error" onClick={() => handleDeleteButton()}>
              Delete my account
            </Button>
          </Box>
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
