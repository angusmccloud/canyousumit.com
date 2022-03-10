import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import { BarChart, HelpOutline } from '@mui/icons-material';
import { InfoModal, StatsModal } from '../../containers';
import { colorPalette } from '../../consts';
import { Container } from '../../components';
import { getGridSize, getSeenHowToPlay, setSeenHowToPlay, getSquareSize, useViewport } from '../../utils';
import fullNameLogo from '../../assets/images/fullNameLogo.png';

const PageHeader = () => {
	const colors = colorPalette();
	const [showInfoModal, setShowInfoModal] = useState(false);
	const [showStatsModal, setShowStatsModal] = useState(false);

	useEffect(() => {
		const seenHowToPlay = getSeenHowToPlay();
		if (!seenHowToPlay) {
			setShowInfoModal(true);
			setSeenHowToPlay(true);
		}
	}, []);

	const gridSize = getGridSize();
	const { width, height } = useViewport();
	const squareSize = getSquareSize(height, width);

	return (
		<>
			<InfoModal showModal={setShowInfoModal} visible={showInfoModal} />
			<StatsModal showModal={setShowStatsModal} visible={showStatsModal} />
			<Container style={{ width: '100%', height: 70, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
				<Container style={{ width: (gridSize + 1) * squareSize, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Container style={{width: squareSize, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<IconButton
							size="small"
							edge="start"
							aria-label="Info"
							onClick={() => setShowInfoModal(true)}
							style={{color: colors.textDefault}}
						>
							<HelpOutline />
						</IconButton>
					</Container>
					<img src={fullNameLogo} alt="Sum It" height={50} />
					<Container style={{width: squareSize, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<IconButton
							size='small'
							edge="start"
							aria-label="Stats"
							onClick={() => setShowStatsModal(true)}
							style={{color: colors.textDefault}}
						>
							<BarChart />
						</IconButton>
					</Container>
				</Container>
			</Container>
		</>
	);
}

export default PageHeader;
