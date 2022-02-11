import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styles } from '../../consts';
import { Text } from '../../components';
import { colorPalette } from '../../consts';

const InfoModal = (props) => {
  const colors = colorPalette;
	const handleClose = () => {
		console.log('-- Close --');
		props.showModal(false);
	}

	return (
			<Modal
        open={props.visible}
        onClose={handleClose}
        aria-labelledby="SumIt Info"
        aria-describedby="Information on the SumIt Game"
      >
        <Box sx={styles.modalWrapper}>
          <Text size='XXL' weight='bold' color={colors.darkBlue} component="div">
            Info
          </Text>
          <Text size='L' color={colors.darkBlue} component="div">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Text>
        </Box>
      </Modal>
	);
}

export default InfoModal;
