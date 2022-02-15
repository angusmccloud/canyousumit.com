import React from "react";
import Modal from 'react-modal';
import { styles } from '../../consts';
import { Text } from '../../components';
import { colorPalette } from '../../consts';
import { useViewport } from '../../utils';

const WinnerModal = (props) => {
  const colors = colorPalette();
  const { width, height } = useViewport();
  const handleClose = () => {
    // console.log('-- Close --');
    props.showModal(false);
  }

  return (
    <Modal
      isOpen={props.visible}
      onRequestClose={handleClose}
      ariaHideApp={false}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(33, 74, 92, 0.75)',
        },
        content: {
          padding: 10,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: width < 500 ? width * .9 : 500,
          maxWidth: width > 700 ? 700 : width * .9,
          minHeight: height < 450 ? height * .9 : 400,
          maxHeight: height > 600 ? 600 : height * .9,
          bgcolor: colors.white,
          border: '2px solid #000',
          borderRadius: 20,
          borderColor: colors.darkBlue,
        }
      }}
      contentLabel="Stats Modal"
    >
      <Text size='XXL' weight='bold' color={colors.darkBlue} component="div">
        You Won!
      </Text>
      <Text size='L' color={colors.darkBlue} component="div">
        C'mon Connor, build this thing out! Share button, show some stats, etc!
      </Text>
    </Modal>
  );
}

export default WinnerModal;
