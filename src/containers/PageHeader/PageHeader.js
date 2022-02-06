import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { SettingsOutlined, InfoOutlined, BarChart } from '@mui/icons-material';
import { InfoModal, StatsModal, SettingsModal } from '../../containers';

const PageHeader = (props) => {
	const [showInfoModal, setShowInfoModal] = useState(false);
	const [showStatsModal, setShowStatsModal] = useState(false);
	const [showSettingsModal, setShowSettingsModal] = useState(false);

	return (
		<>
			<InfoModal showModal={setShowInfoModal} visible={showInfoModal} />
			<StatsModal showModal={setShowStatsModal} visible={showStatsModal} />
			<SettingsModal showModal={setShowSettingsModal} visible={showSettingsModal} />
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="Info"
							sx={{ mr: 2 }}
							onClick={() => setShowInfoModal(true)}
						>
							<InfoOutlined />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							{props.pageName}
						</Typography>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="Stats"
							sx={{ mr: 2 }}
							onClick={() => setShowStatsModal(true)}
						>
							<BarChart />
						</IconButton>
						<IconButton
							size="large"
							edge="end"
							color="inherit"
							aria-label="Settings"
							sx={{ mr: 2 }}
							onClick={() => setShowSettingsModal(true)}
						>
							<SettingsOutlined />
						</IconButton>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
}

export default PageHeader;
