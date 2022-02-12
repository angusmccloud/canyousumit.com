import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CircularProgress } from "@mui/material";
import { styles, colorPalette } from '../../consts';
import { Text } from '../../components';
import { getStats } from '../../utils';

const StatsModal = (props) => {
  const [stats, setStats] = useState(undefined);
  const colors = colorPalette();

  useEffect(() => {
    console.log('-- Stats Modal, Let\'s Get Data!! --');
    setStats(getStats());
  }, [props]);

	const handleClose = () => {
		console.log('-- Close --');
		props.showModal(false);
	}

  const summaryStat = (label, value) => {
    return (
      <>
        <div style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text size='XXL' weight='bold' color={colors.darkBlue}>
            {value}
          </Text>
          <Text size='S' color={colors.darkBlue} textAlign='center'>
            {label}
          </Text>
        </div>
      </>
    );
  }

	return (
			<Modal
        open={props.visible}
        onClose={handleClose}
        aria-labelledby="SumIt Stats"
        aria-describedby="Your SumIt Stats"
      >
        <Box sx={styles.modalWrapper}>
          <div>
            <Text size='XXL' weight='bold' color={colors.darkBlue}>
              Statistics
            </Text>
          </div>
          {stats === undefined ? (
            <CircularProgress />
          ) : (
            <>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 10}}>
                {summaryStat('Games Played', stats.statsByGridSize.find((g) => g.gridSize === 'all').totalGames)}
                {summaryStat('Win %', Math.round((stats.statsByGridSize.find((g) => g.gridSize === 'all').wins / stats.statsByGridSize.find((g) => g.gridSize === 'all').totalGames) * 100, 0))}
                {summaryStat('Longest Streak', stats.longestStreak)}
                {summaryStat('Current Streak', stats.currentStreak)}
              </div>
            </>
          )}
        </Box>
      </Modal>
	);
}

export default StatsModal;