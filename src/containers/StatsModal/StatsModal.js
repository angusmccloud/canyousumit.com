import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styles } from '../../utils';

const StatsModal = (props) => {
	const handleClose = () => {
		console.log('-- Close --');
		props.showModal(false);
	}

	return (
			<Modal
        open={props.visible}
        onClose={handleClose}
        aria-labelledby="SumIt Stats"
        aria-describedby="Your SumIt Stats"
      >
        <Box sx={styles.modalWrapper}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Stats
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
	);
}

export default StatsModal;
