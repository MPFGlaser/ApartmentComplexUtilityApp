import {
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../util/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { convertErrorToMessage } from '../../util/ErrorHandler';
import { useSnackbar } from '../../util/SnackbarContext';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Signup(props: LoginProps) {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [terms, setTerms] = useState(false);

  const showSnackbar = useSnackbar();

  async function handleSignup(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      if (password !== passwordConfirmation) {
        showSnackbar({
          message: 'Passwords do not match.',
          severity: 'error',
          isAlert: true,
        });
        return;
      }

      if (!terms) {
        showSnackbar({
          message: 'You must agree to the terms and conditions.',
          severity: 'error',
          isAlert: true,
        });
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser === null) throw new Error('User is null');

      await sendEmailVerification(auth.currentUser);
      await updateProfile(auth.currentUser, { displayName });

      navigate('/login');
    } catch (error: unknown) {
      showSnackbar({
        message: convertErrorToMessage(error),
        severity: 'error',
        isAlert: true,
      });
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
        <Paper sx={{ minWidth: 'lg', maxWidth: 350, m: 2, p: 2 }}>
          <Typography variant="h5" component="h1" align="center">
            Sign up
          </Typography>
          <Typography variant="subtitle1" component="h2" align="center">
            Create an account to submit repair requests.
          </Typography>
          <Typography variant="subtitle2" component="h3" align="center">
            * indicates a required field
          </Typography>
          <FormGroup>
            <FormControl fullWidth sx={{ my: 1 }}>
              <TextField
                required
                id="displayName"
                label="Name"
                aria-describedby="display-name-helper-text"
                onChange={(e) => setDisplayName(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    // focus on email field
                    const emailField = document.getElementById(
                      'email'
                    ) as HTMLInputElement;
                    emailField.focus();
                  }
                }}
              />
            </FormControl>

            <FormControl fullWidth sx={{ my: 1 }}>
              <TextField
                required
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

            <FormControl fullWidth sx={{ my: 1 }}>
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                aria-describedby="password-helper-text"
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    // focus on passwordConfirm field
                    const passwordField = document.getElementById(
                      'passwordConfirm'
                    ) as HTMLInputElement;
                    passwordField.focus();
                  }
                }}
              />
            </FormControl>

            <FormControl fullWidth sx={{ my: 1 }}>
              <TextField
                required
                id="passwordConfirm"
                label="Password Confirmation"
                type="password"
                aria-describedby="passwordConfirm-helper-text"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  required
                  id="terms"
                  onChange={(e) => setTerms(e.target.checked)}
                />
              }
              label="I agree to the terms and conditions"
            />
          </FormGroup>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              id="signup-button"
              variant="contained"
              onClick={(e) => handleSignup(e)}
            >
              Sign up
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Signup;
