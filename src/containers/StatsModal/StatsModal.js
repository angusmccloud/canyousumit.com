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
  };

  const gridStats = (gridSize, thisGridStats) => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', paddingTop: 20}} >
        <Text size='XL' weight='bold' color={colors.darkBlue}>
          {gridSize}x{gridSize} Stats
        </Text>
        {thisGridStats.totalGames === 0 ? (
          <Text size='L' color={colors.darkBlue}>
            None Played Yet
          </Text>
        ) : (
          <div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 5}}>
              {summaryStat('Games Played', thisGridStats.totalGames)}
              {summaryStat('Win %', Math.round((thisGridStats.wins / thisGridStats.totalGames) * 100, 0))}
              {summaryStat('Average Moves', thisGridStats.averageMoves)}
              {summaryStat('Best Moves', thisGridStats.fewestMoves)}
            </div>
          </div>
        )}
      </div>
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
              Overall Statistics
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
              {gridStats(4, stats.statsByGridSize.find((g) => g.gridSize === 4))}
              {gridStats(5, stats.statsByGridSize.find((g) => g.gridSize === 5))}
              {gridStats(6, stats.statsByGridSize.find((g) => g.gridSize === 6))}
            </>
          )}
        </Box>
      </Modal>
	);
}

export default StatsModal;