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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser && claims) {
      currentUser.getIdTokenResult().then((idTokenResult) => {
        const userHasClaim = claims.some(
          (claim) => idTokenResult.claims[claim]
        );
        setHasClaim(userHasClaim);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [currentUser, claims]);

  if (isLoading) {
    return null; // Or your loading component
  }

  if (!currentUser || (claims && !hasClaim)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
