import React, { useState } from "react";
import Modal from 'react-modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { colorPalette } from '../../consts';
import { Text } from '../../components';
import { getSettings, setSettings, useViewport } from '../../utils';

const SettingsModal = (props) => {
  const colors = colorPalette();
  const [settings, setSettingsState] = useState(getSettings());
  const { width, height } = useViewport();

  const handleSettingChange = (event) => {
    const setting = event.target.name;
    const value = event.target.checked;
    const newSettings = { ...settings };
    newSettings[setting] = value;
    setSettingsState(newSettings);
    setSettings(newSettings);
    // if (setting === 'darkMode') {
      props.handleThemeChange();
    // }
  };

  const handleClose = () => {
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
          padding: width > 500 ? 20 : 10,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: width < 500 ? width * .9 : 500,
          maxWidth: width > 700 ? 700 : width * .9,
          minHeight: height < 100 ? height * .9 : 100,
          maxHeight: height > 200 ? 200 : height * .9,
          backgroundColor: colors.background,
          border: '2px solid #000',
          borderRadius: 20,
          borderColor: colors.darkBlue,
        }
      }}
      contentLabel="Settings Modal"
    >
      <>
        <Text size='XXL' weight='bold' color={colors.textDefault} component="div">
          Settings
        </Text>
        <FormGroup>
          <FormControlLabel control={<Switch style={{ color: colors.textDefault }} checked={settings.darkMode} onChange={handleSettingChange} name='darkMode' />} label="Dark Mode" style={{ color: colors.textDefault }} />
          <FormControlLabel control={<Switch style={{ color: colors.textDefault }} checked={settings.showSums} onChange={handleSettingChange} name='showSums' />} label="Show Sums (Easier) (Coming Soon)" style={{ color: colors.textDefault }} />
          <FormControlLabel control={<Switch style={{ color: colors.textDefault }} checked={settings.lockTopCorner} onChange={handleSettingChange} name='lockTopCorner' />} label="Show Top Corner (Easier)" style={{ color: colors.textDefault }} />
        </FormGroup>
      </>
    </Modal>
  );
}

export default SettingsModal;
