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
import DialogComponent from '../../DialogComponent/DialogComponent';
import { useSnackbar } from '../../../util/SnackbarContext';
import userService from '../../../services/user.service';

/* eslint-disable-next-line */
export interface EditorProps {}

export function Editor(props: EditorProps) {
  const { currentUser, getUser, signOut } = useAuth();

  const [displayName, setDisplayName] = React.useState('');
  const [location, setLocation] = React.useState<ILocation | null>(null); // [location, setLocation
  const [locationName, setLocationName] = React.useState('');
  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
  const [openDeleteDataDialog, setOpenDeleteDataDialog] = React.useState(false);

  const showSnackbar = useSnackbar();

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

  const handleCancel = (confirm: boolean) => {
    if (confirm) {
      navigate(-1);
    }
    setOpenCancelDialog(false);
  };

  const handleDataDelete = (confirm: boolean) => {
    setOpenDeleteDataDialog(false);
    if (confirm) {
      userService
        .requestAccountDeletion()
        .then(() => {
          // Delete data
          showSnackbar({
            message: 'Account deletion requested.',
            severity: 'success',
            isAlert: true,
            duration: 5000,
          });
          signOut();
          navigate('/');
        })
        .catch((error) => {
          showSnackbar({
            message: 'Something went wrong. Please try again later.',
            severity: 'error',
            isAlert: true,
            duration: 5000,
          });
        });
    }
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
          navigate('/');
        });
        getUser();
      } catch (error) {
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
              <Button color="error" onClick={() => setOpenCancelDialog(true)}>
                Cancel
              </Button>
            </ButtonGroup>
            <Button color="error" onClick={() => setOpenDeleteDataDialog(true)}>
              Delete my account
            </Button>
          </Box>
          <DialogComponent
            open={openCancelDialog}
            title="Are you sure you want to cancel and go back?"
            content="All changes will be lost."
            buttons={[
              {
                id: 'cancel',
                text: 'No',
                callback: () => handleCancel(false),
              },
              {
                id: 'confirm',
                text: 'Yes',
                color: 'error',
                callback: () => handleCancel(true),
              },
            ]}
            onClose={() => handleCancel(false)}
          />
          <DialogComponent
            open={openDeleteDataDialog}
            title="Are you sure you want to delete your account?"
            content={[
              'Your personal data will be permanently deleted and repair requests will be anonymised.',
              'This action cannot be undone.',
            ]}
            buttons={[
              {
                id: 'cancel',
                text: 'No, take me back',
                callback: () => handleDataDelete(false),
              },
              {
                id: 'confirm',
                text: 'Yes, delete my account',
                color: 'error',
                callback: () => handleDataDelete(true),
              },
            ]}
            onClose={() => handleDataDelete(false)}
          />
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
