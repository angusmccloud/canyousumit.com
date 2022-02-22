import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { CircularProgress } from "@mui/material";
import Divider from '@mui/material/Divider';
import { colorPalette } from '../../consts';
import { Text } from '../../components';
import { getStats, useViewport } from '../../utils';

const StatsModal = (props) => {
  const [stats, setStats] = useState(undefined);
  const colors = colorPalette();
  const { width, height } = useViewport();

  useEffect(() => {
    // console.log('-- Stats Modal, Let\'s Get Data!! --');
    setStats(getStats());
  }, [props]);

  const handleClose = () => {
    // console.log('-- Close --');
    props.showModal(false);
  }

  const summaryStat = (label, value) => {
    return (
      <>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text size='XXL' weight='bold' color={colors.textDefault}>
            {value}
          </Text>
          <Text size='S' color={colors.textDefault} textAlign='center'>
            {label}
          </Text>
        </div>
      </>
    );
  };

  const gridStats = (gridSize, thisGridStats) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 20 }} >
        <Text size='XL' weight='bold' color={colors.textDefault}>
          {gridSize}x{gridSize} Stats
        </Text>
        {thisGridStats.totalGames === 0 ? (
          <Text size='L' color={colors.textDefault}>
            None Played Yet
          </Text>
        ) : (
          <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 5 }}>
              {summaryStat('Games Played', thisGridStats.totalGames)}
              {summaryStat('Win %', thisGridStats.totalGames > 0 ? Math.round((thisGridStats.wins / thisGridStats.totalGames) * 100) : 0)}
              {summaryStat('Average Moves', thisGridStats.averageMoves > 0 ? Math.round(thisGridStats.averageMoves) : 0)}
              {summaryStat('Best Moves', thisGridStats.fewestMoves)}
            </div>
          </div>
        )}
      </div>
    );
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
          minWidth: width < 300 ? width * .9 : 300,
          maxWidth: width > 500 ? 500 : width * .9,
          minHeight: height < 450 ? height * .9 : 400,
          maxHeight: height > 600 ? 600 : height * .9,
          backgroundColor: colors.background,
          border: '2px solid #000',
          borderRadius: 20,
          borderColor: colors.darkBlue,
        }
      }}
      contentLabel="Stats Modal"
    >
      <>
        <div>
          <Text size='XXXL' weight='bold' color={colors.textDefault}>
            Overall Statistics
          </Text>
        </div>
        {stats === undefined ? (
          <CircularProgress />
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 10, paddingBottom: 20 }}>
              {summaryStat('Games Played', stats.statsByGridSize.find((g) => g.gridSize === 'all').totalGames)}
              {summaryStat('Win %', stats.statsByGridSize.find((g) => g.gridSize === 'all').totalGames > 0 ? Math.round((stats.statsByGridSize.find((g) => g.gridSize === 'all').wins / stats.statsByGridSize.find((g) => g.gridSize === 'all').totalGames) * 100, 0) : 0)}
              {summaryStat('Longest Streak', stats.longestStreak)}
              {summaryStat('Current Streak', stats.currentStreak)}
            </div>
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