import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useUser } from './UserContext';

export const ProtectedRoute = ({
  children,
  claims,
}: {
  children: ReactNode;
  claims?: string[];
}) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (claims !== undefined && Array.isArray(claims)) {
    user.getIdTokenResult().then((idTokenResult) => {
      // check if user has a claim that is included in the claims array
      const hasClaim = claims.some((claim) => idTokenResult.claims[claim]);
      if (!hasClaim) {
        return <Navigate to="/login" replace />;
      }
    });
  }

  return children;
};
