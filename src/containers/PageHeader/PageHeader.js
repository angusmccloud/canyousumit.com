import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import { SettingsOutlined, InfoOutlined, BarChart } from '@mui/icons-material';
import { InfoModal, StatsModal, SettingsModal } from '../../containers';
import { colors } from '../../consts';
import fullNameLogo from '../../assets/images/fullNameLogo.png';

const PageHeader = (props) => {
	const [showInfoModal, setShowInfoModal] = useState(false);
	const [showStatsModal, setShowStatsModal] = useState(false);
	const [showSettingsModal, setShowSettingsModal] = useState(false);

	// TO-DO: Change these to use [whatever things I haven't built yet]
	const gridSize = 4;
	const squareSize = 75;

	return (
		<>
			<InfoModal showModal={setShowInfoModal} visible={showInfoModal} />
			<StatsModal showModal={setShowStatsModal} visible={showStatsModal} />
			<SettingsModal showModal={setShowSettingsModal} visible={showSettingsModal} />
			<div style={{ width: '100%', height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ width: (gridSize + 1) * squareSize, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<div style={{width: squareSize, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<IconButton
						size="small"
						edge="start"
						aria-label="Info"
						onClick={() => setShowInfoModal(true)}
						style={{color: colors.primaryBlue}}
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
							style={{color: colors.primaryBlue}}
						>
							<BarChart />
						</IconButton>
						<IconButton
							size='small'
							edge="end"
							aria-label="Settings"
							onClick={() => setShowSettingsModal(true)}
							style={{color: colors.primaryBlue}}
						>
							<SettingsOutlined />
						</IconButton>
					</div>
				</div>
			</div>
		</>
	);
}

export default PageHeader;
