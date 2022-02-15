import React, {useEffect, useState} from "react";
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import { styles } from '../../consts';
import { Text } from '../../components';
import { colorPalette } from '../../consts';
import { useViewport, getStats } from '../../utils';
import ReactGA from "react-ga4";
import { googleAnalyticsId } from '../../consts';

const WinnerModal = (props) => {
  const colors = colorPalette();
  const [bestThisSize, setBestThisSize] = useState(0);
  const [stats, setStats] = useState(undefined);
  const { width, height } = useViewport();
  const { gridSize, moves, visible } = props;
  ReactGA.initialize([{trackingId: googleAnalyticsId}]);

  const loadStats = () => {
    if(visible && gridSize) {
      const fetchedStats = getStats();
      const best = fetchedStats.statsByGridSize.find((g) => g.gridSize === gridSize);  
      setStats(fetchedStats);
      setBestThisSize(best);
    }
  };

  useEffect(() => {
    loadStats();
  }, [visible, gridSize]);

  useEffect(() => {
    loadStats();
  }, []);

  const handleClose = () => {
    // console.log('-- Close --');
    props.showModal(false);
  }

  const shareWin = () => {
    try {
      let shareString = 'I Summed It!\n\n';
      shareString += `I won today's ${gridSize}x${gridSize} SumIt in ${moves} moves${moves <= bestThisSize ? ', my new best!' : '!'}!\n\n`;
      if(stats && stats.currentStreak > 1) {
        shareString += `I've won ${stats.currentStreak} games in a row!\n\n`;
      }
      shareString += 'https://canyousumit.com';
      if (navigator.share) {
        // console.log('-- On a phone! --', shareString);
        navigator.share({
          text: shareString
        });
        ReactGA.event({
          category: 'Share',
          action: 'Mobile Share',
          label: `Share Dialog`,
          value: shareString
        });
      } else {
        // console.log('-- Copy to Clipboard --', shareString);
        navigator.clipboard.writeText(shareString);
        ReactGA.event({
          category: 'Share',
          action: 'Browser Share',
          label: `Copied to Clipboard`,
          value: shareString
        });
      }
    } catch (ex) {
      // console.log('-- Error Sharing --', ex);
      // analytics.event(analytics.ACTIONS.error, 'shareGame' + ex.toString());
    }
  };

  return (
    <Modal
      isOpen={visible}
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
          minHeight: height < 250 ? height * .9 : 200,
          maxHeight: height > 300 ? 300 : height * .9,
          bgcolor: colors.white,
          border: '2px solid #000',
          borderRadius: 20,
          borderColor: colors.darkBlue,
        }
      }}
      contentLabel="Stats Modal"
    >
      <Text size='XXXL' weight='bold' color={colors.darkBlue}>
        You Won!
      </Text>
      <div style={{paddingTop: 20}}>
        <Text size='XL' color={colors.darkBlue}>
          You beat today's {gridSize}x{gridSize} puzzle in {moves} moves{bestThisSize <= moves ? ', your new best!' : '!'}
        </Text>
      </div>
      {stats && (
        <div style={{paddingTop: 20}}>
          <Text size='XL' color={colors.darkBlue}>
            {stats.currentStreak <= 1 ? (
              `While your current streak of wins is only 1, come back tomorrow to keep it going!`
            ) : (
              `Your current win-streak is ${stats.currentStreak}${stats.currentStreak >= stats.longestStreak ? ', your longest streak yet! Come back tomorrow to keep it going!' : ', come back tomorrow to keep it going!'}`
            )}
          </Text>
        </div>
      )}
      <div style={{paddingTop: 20}}>
        <Button variant="contained" size="large" style={{backgroundColor: colors.green}} onClick={() => shareWin()}>
          <Text size='XXL' weight='bold' color={colors.white}>
            Share
          </Text>
        </Button>
      </div>
    </Modal>
  );
}

export default WinnerModal;
