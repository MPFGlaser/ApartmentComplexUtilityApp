import React, { createContext, useContext, useState } from 'react';
import DialogComponent, {
  DialogComponentProps,
} from '../components/DialogComponent/DialogComponent';

type DialogContextProps = Omit<DialogComponentProps, 'open' | 'onClose'>;

const DialogContext = createContext<(props: DialogContextProps) => void>(() => {
  throw new Error('DialogContext must be used within a DialogProvider');
});

export const DialogProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [dialogProps, setDialogProps] = useState<DialogContextProps | null>(
    null
  );

  const showDialog = (props: DialogContextProps) => {
    setDialogProps(props);
  };

  const handleClose = () => {
    setDialogProps(null);
  };

  return (
    <DialogContext.Provider value={showDialog}>
      {children}
      {dialogProps && (
        <DialogComponent open={true} onClose={handleClose} {...dialogProps} />
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};
