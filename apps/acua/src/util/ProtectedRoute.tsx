import { Navigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

export const ProtectedRoute = ({
  children,
  claims,
}: {
  children: ReactNode;
  claims?: string[];
}) => {
  const { currentUser } = useAuth();
  const [hasClaim, setHasClaim] = useState(false);

  useEffect(() => {
    if (currentUser && claims) {
      currentUser.getIdTokenResult().then((idTokenResult) => {
        const userHasClaim = claims.some(
          (claim) => idTokenResult.claims[claim]
        );
        setHasClaim(userHasClaim);
      });
    }
  }, [currentUser, claims]);

  if (!currentUser || (claims && !hasClaim)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
