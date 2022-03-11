import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Divider from '@mui/material/Divider';
import { colorPalette } from '../../consts';
import { Text, Container, Modal } from '../../components';
import { getStats } from '../../utils';

const StatsModal = (props) => {
  const [stats, setStats] = useState(undefined);
  const colors = colorPalette();

  useEffect(() => {
    // console.log('-- Stats Modal, Let\'s Get Data!! --');
    setStats(getStats());
  }, [props]);

  const summaryStat = (label, value) => {
    return (
      <>
        <Container style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text size='XXL' weight='bold' color={colors.textDefault}>
            {value}
          </Text>
          <Text size='S' color={colors.textDefault} textAlign='center'>
            {label}
          </Text>
        </Container>
      </>
    );
  };

  const gridStats = (gridSize, thisGridStats) => {
    return (
      <Container style={{ display: 'flex', flexDirection: 'column', paddingTop: 20 }} >
        <Text size='XL' weight='bold' color={colors.textDefault}>
          {gridSize}x{gridSize} Stats
        </Text>
        {thisGridStats.totalGames === 0 ? (
          <Text size='L' color={colors.textDefault}>
            None Played Yet
          </Text>
        ) : (
          <Container>
            <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 5 }}>
              {summaryStat('Games Played', thisGridStats.totalGames)}
              {summaryStat('Win %', thisGridStats.totalGames > 0 ? Math.round((thisGridStats.wins / thisGridStats.totalGames) * 100) : 0)}
              {summaryStat('Average Moves', thisGridStats.averageMoves > 0 ? Math.round(thisGridStats.averageMoves) : 0)}
              {summaryStat('Best Moves', thisGridStats.fewestMoves)}
            </Container>
          </Container>
        )}
      </Container>
    );
  }

  return (
    <Modal
      visible={props.visible}
      setShowModal={props.showModal}
      minWidth={300}
      maxWidth={500}
      minHeight={350}
      maxHeight={400}
    >
      <>
        <Container>
          <Text size='XXXL' weight='bold' color={colors.textDefault}>
            Overall Statistics
          </Text>
        </Container>
        {stats === undefined ? (
          <CircularProgress />
        ) : (
          <>
            <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 10, paddingBottom: 20 }}>
              {summaryStat('Games Played', stats.statsByGridSize.find((g) => g.gridSize === 'all').totalGames)}
              {summaryStat('Win %', stats.statsByGridSize.find((g) => g.gridSize === 'all').totalGames > 0 ? Math.round((stats.statsByGridSize.find((g) => g.gridSize === 'all').wins / stats.statsByGridSize.find((g) => g.gridSize === 'all').totalGames) * 100, 0) : 0)}
              {summaryStat('Longest Streak', stats.longestStreak)}
              {summaryStat('Current Streak', stats.currentStreak)}
            </Container>
            <Divider color={colors.divider} />
            {gridStats(4, stats.statsByGridSize.find((g) => g.gridSize === 4))}
            {gridStats(5, stats.statsByGridSize.find((g) => g.gridSize === 5))}
            {gridStats(6, stats.statsByGridSize.find((g) => g.gridSize === 6))}
          </>
        )}
      </>
    </Modal>
  );
}

export default StatsModal;