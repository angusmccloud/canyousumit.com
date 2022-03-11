import React from "react";
import ReactModal from 'react-modal';
import { colorPalette } from '../../consts';
import { useViewport } from '../../utils';

const Modal = (props) => {
  const colors = colorPalette();
  const { width, height } = useViewport();

  const { children, contentLabel, visible, setShowModal, minWidth, maxWidth, minHeight, maxHeight, ...restOfProps } = props;
  const modalHeight = Math.max(Math.min(minHeight, height * .9), Math.min(maxHeight, height * .9));
  const modalWidth = Math.max(Math.min(minWidth, width * .9), Math.min(maxWidth, width * .9));

  return (
    <ReactModal
      isOpen={visible}
      onRequestClose={() => setShowModal(false)}
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
          padding: width > 500 ? 20 : 10,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          // minWidth: Math.min(minWidth, width * .9),
          // maxWidth: Math.min(maxWidth, width * .9),
          // minHeight: Math.min(minHeight, height * .9),
          // maxHeight: Math.min(maxHeight, height * .9),
          width: modalWidth,
          height: modalHeight,
          backgroundColor: colors.background,
          border: '2px solid #000',
          borderRadius: 20,
          borderColor: colors.darkBlue,
        }
      }}
      {...restOfProps}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
