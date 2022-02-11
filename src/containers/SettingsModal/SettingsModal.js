import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styles, colorPalette } from '../../consts';
import { Text } from '../../components';
import { getSettings, setSettings } from '../../utils';

const SettingsModal = (props) => {
  const colors = colorPalette();
  const [settings, setSettingsState] = useState(getSettings());

  const handleSettingChange = (event) => {
    console.log('-- Event --', event);
    console.log('-- Checked --', event.target.checked);
    console.log('-- Name --', event.target.name);

    const setting = event.target.name;
    const value = event.target.checked;
    const newSettings = { ...settings };
    newSettings[setting] = value;
    setSettingsState(newSettings);
    setSettings(newSettings);
  };

	const handleClose = () => {
		props.showModal(false);
	}

	return (
			<Modal
        open={props.visible}
        onClose={handleClose}
        aria-labelledby="SumIt Settings"
        aria-describedby="Your SumIt Settings"
      >
        <Box sx={styles.modalWrapper}>
          <Text size='XXL' weight='bold' color={colors.darkBlue} component="div">
            Settings
          </Text>
          <FormGroup>
            <FormControlLabel control={<Switch style={{color: colors.primaryBlue}} checked={settings.darkMode} onChange={handleSettingChange} name='darkMode' />} label="Dark Mode - Mode Coming Soon" />
            <FormControlLabel control={<Switch style={{color: colors.primaryBlue}} checked={settings.lockTopCorner} onChange={handleSettingChange} name='lockTopCorner' />} label="Show Top Corner (Easier) - Control Coming Soon" />
            <FormControlLabel control={<Switch style={{color: colors.primaryBlue}} checked={settings.showSums} onChange={handleSettingChange} name='showSums' />} label="Show Sums (Easier) - Control Coming Soon" />
          </FormGroup>
        </Box>
      </Modal>
	);
}

export default SettingsModal;
