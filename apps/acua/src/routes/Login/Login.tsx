import {
  Alert as MuiAlert,
  AlertProps,
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { MouseEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../util/firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { convertErrorToMessage } from '../../util/ErrorHandler';
import { useAuth } from '../../util/AuthProvider';

/* eslint-disable-next-line */
export interface LoginProps {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Login(props: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { refreshIdToken } = useAuth();

  const [snackbarVisiblity, setSnackbarVisiblity] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarVisiblity(false);
    setSnackbarMessage('');
  };

  async function handleLogin(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const token = await refreshIdToken();

      if (token) {
        navigate('/edit-profile');
      } else {
        throw new Error('Failed to login. Please try again.');
      }
    } catch (error: unknown) {
      setSnackbarMessage(convertErrorToMessage(error));
      setSnackbarVisiblity(true);
    }
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      sx={{ minHeight: '100vh', my: 2 }}
    >
      <Grid item>
        <Paper sx={{ maxWidth: 350, m: 2, p: 2 }}>
          <Typography variant="h5" component="h1" align="center">
            Login
          </Typography>
          <FormControl fullWidth sx={{ my: 2 }}>
            <TextField
              id="email"
              label="Email address"
              type="email"
              aria-describedby="email-helper-text"
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  // focus on password field
                  const passwordField = document.getElementById(
                    'password'
                  ) as HTMLInputElement;
                  passwordField.focus();
                }
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ my: 2 }}>
            <TextField
              id="password"
              label="Password"
              type="password"
              aria-describedby="password-helper-text"
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  // click on sign in button
                  const signInButton = document.getElementById(
                    'signin-button'
                  ) as HTMLButtonElement;
                  signInButton.click();
                }
              }}
            />
          </FormControl>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              id="signin-button"
              variant="contained"
              onClick={(e) => handleLogin(e)}
            >
              Sign in
            </Button>
            <Button
              id="signup-button"
              variant="outlined"
              component={Link}
              to="/signup"
            >
              Sign up
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Snackbar
        open={snackbarVisiblity}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Login;
