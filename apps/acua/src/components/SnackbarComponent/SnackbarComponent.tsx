import React, { useEffect } from 'react';
import { Alert, AlertColor, Snackbar, SnackbarContent } from '@mui/material';

interface SnackbarComponentProps {
  open: boolean;
  onClose: () => void;
  message: string;
  duration?: number;
  isAlert?: boolean;
  severity?: AlertColor;
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({
  open,
  onClose,
  message,
  duration = 3000,
  isAlert = false,
  severity = 'info',
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration); // close after 3 seconds
    return () => clearTimeout(timer); // cleanup on unmount
  }, [open, onClose, duration]);

  return (
    <Snackbar open={open} onClose={onClose}>
      {isAlert ? (
        <Alert variant="filled" severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      ) : (
        <SnackbarContent message={message} action={null} />
      )}
    </Snackbar>
  );
};

export default SnackbarComponent;
