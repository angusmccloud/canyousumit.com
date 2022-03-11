import React from "react";
import { Snackbar as MuiSnackbar } from '@mui/material';

const Snackbar = (props) => {
  const {open, message, severity, duration, onClose} = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      onClose={handleClose}
      message={message}
      severity={severity || 'success'}
      autoHideDuration={duration || 6000} 
    />
  )
};

export default Snackbar;