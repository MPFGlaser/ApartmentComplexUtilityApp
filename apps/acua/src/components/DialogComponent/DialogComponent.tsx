import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import React from 'react';

export interface DialogComponentProps {
  open: boolean;
  title: string;
  content: string | string[];
  buttons?: {
    id: string;
    text: string;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    variant?: 'text' | 'outlined' | 'contained';
    callback?: () => void;
  }[];
  onClose: () => void;
}

const DialogComponent: React.FC<DialogComponentProps> = ({
  open,
  title,
  content,
  buttons,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {Array.isArray(content) ? (
            content.map((text) => (
              <Typography variant="body1" key={text}>
                {text}
              </Typography>
            ))
          ) : (
            <Typography variant="body1">{content}</Typography>
          )}
        </DialogContentText>
      </DialogContent>
      {buttons ? (
        <DialogActions>
          {buttons.map((button) => (
            <Button
              key={button.id}
              color={button.color ?? 'primary'}
              variant={button.variant ?? 'text'}
              onClick={() => {
                if (button.callback) {
                  button.callback();
                }
                onClose();
              }}
            >
              {button.text}
            </Button>
          ))}
        </DialogActions>
      ) : null}
    </Dialog>
  );
};

export default DialogComponent;
