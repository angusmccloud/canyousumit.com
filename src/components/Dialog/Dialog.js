import React from "react";
import Button from '@mui/material/Button';
import { Dialog as MuiDialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = (props) => {
  const {open, handleClose, handleConfirmationPress, title, description, confirmText, cancelText} = props;

  return (
    <div>
      <MuiDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{cancelText}</Button>
          <Button onClick={handleConfirmationPress}>{confirmText}</Button>
        </DialogActions>
      </MuiDialog>
    </div>
  );
};

export default Dialog;