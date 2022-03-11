import React, { useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { colorPalette } from '../../consts';
import { Text, Modal } from '../../components';
import { getSettings, setSettings } from '../../utils';

const SettingsModal = (props) => {
  const colors = colorPalette();
  const [settings, setSettingsState] = useState(getSettings());

  const handleSettingChange = (event) => {
    const setting = event.target.name;
    const value = event.target.checked;
    const newSettings = { ...settings };
    newSettings[setting] = value;
    setSettingsState(newSettings);
    setSettings(newSettings);
    props.handleThemeChange();
  };

  return (
    <Modal
      visible={props.visible}
      setShowModal={props.showModal}
      minWidth={500}
      maxWidth={700}
      minHeight={100}
      maxHeight={175}
    >
      <>
        <Text size='XXL' weight='bold' color={colors.textDefault}>
          Settings
        </Text>
        <FormGroup>
          <FormControlLabel control={<Switch style={{ color: colors.textDefault }} checked={settings.darkMode} onChange={handleSettingChange} name='darkMode' />} label="Dark Mode" style={{ color: colors.textDefault }} />
          <FormControlLabel control={<Switch style={{ color: colors.textDefault }} checked={settings.showSums} onChange={handleSettingChange} name='showSums' />} label="Show Sums (Easier)" style={{ color: colors.textDefault }} />
          <FormControlLabel control={<Switch style={{ color: colors.textDefault }} checked={settings.lockTopCorner} onChange={handleSettingChange} name='lockTopCorner' />} label="Start with Top Corner (Easier)" style={{ color: colors.textDefault }} />
        </FormGroup>
      </>
    </Modal>
  );
}

export default SettingsModal;
