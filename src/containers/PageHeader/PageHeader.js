import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import { InfoOutlined, BarChart } from '@mui/icons-material';
import { InfoModal, StatsModal } from '../../containers';
import { colorPalette } from '../../consts';
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
			<div style={{ width: '100%', height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ width: (gridSize + 1) * squareSize, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<div style={{width: squareSize, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<IconButton
							size="small"
							edge="start"
							aria-label="Info"
							onClick={() => setShowInfoModal(true)}
							style={{color: colors.textDefault}}
						>
							<InfoOutlined />
						</IconButton>
					</div>
					<img src={fullNameLogo} alt="Sum It" height={50} />
					<div style={{width: squareSize, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<IconButton
							size='small'
							edge="start"
							aria-label="Stats"
							onClick={() => setShowStatsModal(true)}
							style={{color: colors.textDefault}}
						>
							<BarChart />
						</IconButton>
					</div>
				</div>
			</div>
		</>
	);
}

export default PageHeader;
