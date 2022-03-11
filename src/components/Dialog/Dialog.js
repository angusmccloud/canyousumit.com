import React from "react";
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { Container, Modal, Text } from '../';
import { colorPalette } from '../../consts';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = (props) => {
  const colors = colorPalette();
  const { open, handleClose, handleConfirmationPress, title, description, confirmText, cancelText } = props;

  const handleForceClose = () => {
    handleClose();
  }

  return (
    <Modal
      visible={open}
      setShowModal={handleForceClose}
      minWidth={300}
      maxWidth={500}
      minHeight={100}
      maxHeight={160}
    >
      <>
        <Container>
          <Text size='XXXL' weight='bold' color={colors.textDefault}>
            {title}
          </Text>
        </Container>
        <Container>
          <Text size='XL' color={colors.textDefault}>
            {description}
          </Text>
        </Container>
        <Container style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingTop: 20}}>
          <Button onClick={handleClose}>{cancelText}</Button>
          <Button onClick={handleConfirmationPress}>{confirmText}</Button>
        </Container>
      </>
    </Modal>
  );
};

export default Dialog;