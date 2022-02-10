import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styles } from '../../consts';
import { Typography } from '../../components';
import { colorPalette } from '../../consts';

const WinnerModal = (props) => {
  const colors = colorPalette();
	const handleClose = () => {
		console.log('-- Close --');
		props.showModal(false);
	}

	return (
			<Modal
        open={props.visible}
        onClose={handleClose}
        aria-labelledby="You Won!"
        aria-describedby="You Won SumIt!"
      >
        <Box sx={styles.modalWrapper}>
          <Typography size='XXL' weight='bold' color={colors.darkBlue} component="div">
            You Won!
          </Typography>
          <Typography size='L' color={colors.darkBlue} component="div">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
	);
}

export default WinnerModal;
