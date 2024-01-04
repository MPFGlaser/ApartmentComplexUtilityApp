import { Navigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { Box, CircularProgress } from '@mui/material';

export const ProtectedRoute = ({
  children,
  claims,
}: {
  children: ReactNode;
  claims?: string[];
}) => {
  const { user, userLoading } = useUser();
  const [hasClaim, setHasClaim] = useState(false);

  useEffect(() => {
    if (user && claims) {
      user.getIdTokenResult().then((idTokenResult) => {
        const userHasClaim = claims.some(
          (claim) => idTokenResult.claims[claim]
        );
        setHasClaim(userHasClaim);
      });
    }
  }, [user, claims]);

  if (userLoading) {
    return (
      <Box
        sx={{
          my: 2,
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh', // take up the full viewport height
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user || (claims && !hasClaim)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
