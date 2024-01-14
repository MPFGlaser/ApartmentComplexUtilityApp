import {
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { convertErrorToMessage } from '../../util/ErrorHandler';
import { useAuth } from '../../util/AuthProvider';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from '../../util/SnackbarContext';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const showSnackbar = useSnackbar();

  async function handleLogin(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(email, password);
      showSnackbar({
        message: 'Login successful',
        severity: 'success',
        isAlert: true,
      });
      navigate('/edit-profile');
    } catch (error: unknown) {
      setLoading(false);
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
            {!loading ? (
              <Button
                id="signin-button"
                variant="contained"
                onClick={(e) => handleLogin(e)}
                data-testid="login-button"
              >
                Sign in
              </Button>
            ) : (
              <LoadingButton
                id="signin-button"
                variant="contained"
                loading={loading}
              >
                Sign in
              </LoadingButton>
            )}
            <Button
              id="signup-button"
              variant="outlined"
              component={Link}
              to="/signup"
              data-testid="signup-button"
            >
              Sign up
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
