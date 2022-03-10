import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import { CopyrightOutlined, InfoOutlined, SettingsOutlined } from '@mui/icons-material';
import { SettingsModal, AboutUsModal } from '../';
import { colorPalette } from '../../consts';
import { getGridSize, getSquareSize, useViewport } from '../../utils';
import { Text, Container } from '../../components';

const PageFooter = (props) => {
	const colors = colorPalette();
	const [showSettingsModal, setShowSettingsModal] = useState(false);
	const [showAboutUsModal, setShowAboutUsModal] = useState(false);

	const gridSize = getGridSize();
	const { width, height } = useViewport();
	const squareSize = getSquareSize(height, width);

	return (
		<>
			<SettingsModal showModal={setShowSettingsModal} visible={showSettingsModal} handleThemeChange={props.handleThemeChange} />
			<AboutUsModal showModal={setShowAboutUsModal} visible={showAboutUsModal} />
			<Container style={{ width: '100%', height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
				<Container style={{ width: (gridSize + 1) * squareSize, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Container style={{width: squareSize, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<IconButton
						size="small"
						edge="start"
						aria-label="Info"
						onClick={() => setShowAboutUsModal(true)}
						style={{color: colors.textDefault}}
					>
						<InfoOutlined />
					</IconButton>
					</Container>
					<Container style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
						<CopyrightOutlined style={{color: colors.textDefault, marginRight: 5}} />
						<Text color={colors.textDefault} size={'M'}>
							{new Date().getFullYear()} SUMIT
						</Text>
					</Container>
					<Container style={{width: squareSize, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<IconButton
							size='small'
							edge="end"
							aria-label="Settings"
							onClick={() => setShowSettingsModal(true)}
							style={{color: colors.textDefault}}
						>
							<SettingsOutlined />
						</IconButton>
					</Container>
				</Container>
			</Container>
		</>
	);
}

export default PageFooter;
