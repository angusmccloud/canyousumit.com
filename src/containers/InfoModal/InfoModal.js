import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styles } from '../../consts';
import { Typography } from '../../components';
import { colors } from '../../consts';

const InfoModal = (props) => {
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
          <Typography size='XXL' weight='bold' color={colors.darkBlue} component="div">
            Info
          </Typography>
          <Typography size='L' color={colors.darkBlue} component="div">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
	);
}

export default InfoModal;
