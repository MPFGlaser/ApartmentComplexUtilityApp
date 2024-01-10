// SnackbarContext.tsx
import React, { createContext, useCallback, useContext, useState } from 'react';
import SnackbarComponent from '../components/SnackbarComponent/SnackbarComponent';

interface SnackbarContextProps {
  message: string;
  duration?: number;
  isAlert?: boolean;
  severity?: 'error' | 'warning' | 'info' | 'success';
}

const SnackbarContext = createContext<(props: SnackbarContextProps) => void>(
  () => {
    throw new Error('SnackbarContext must be used within a SnackbarProvider');
  }
);
export const SnackbarProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [snackbarProps, setSnackbarProps] =
    useState<SnackbarContextProps | null>(null);

  const showSnackbar = useCallback((props: SnackbarContextProps) => {
    setSnackbarProps({
      ...props,
      isAlert: props.severity ? true : false,
    });
  }, []);

  const handleClose = () => {
    setSnackbarProps(null);
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      {snackbarProps && (
        <SnackbarComponent
          open={true}
          onClose={handleClose}
          {...snackbarProps}
        />
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
