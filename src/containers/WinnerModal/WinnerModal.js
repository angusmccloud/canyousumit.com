import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import { Text, Snackbar, Container, Modal } from '../../components';
import { colorPalette, googleAnalyticsId } from '../../consts';
import { getStats } from '../../utils';
import ReactGA from "react-ga4";

const WinnerModal = (props) => {
  const colors = colorPalette();
  const [bestThisSize, setBestThisSize] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [stats, setStats] = useState(undefined);
  const [snackbarMessage, setSnackbarMessage] = useState('Copied to Clipboard');
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

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  }

  const numberString = (number) => {
    const convertNum = {
      '1': '1️⃣',
      '2': '2️⃣',
      '3': '3️⃣',
      '4': '4️⃣',
      '5': '5️⃣',
      '6': '6️⃣',
      '7': '7️⃣',
      '8': '8️⃣',
      '9': '9️⃣',
      '0': '0️⃣',
    };

    const num = number.toString();
    let string = '';
    // Convert characters in Num to Emojis
    for(let i = 0; i < num.length; i++) {
      string += convertNum[num[i]];
    }
    return `${num.length <= 3 ? '🟦' : ''}${num.length === 2 || num.length === 4 ? '   ' : ''}${string}${num.length === 2 || num.length === 4 ? '  ' : ''}${num.length <= 3 ? '🟦' : ''}`;
  }

  const shareWin = () => {
    try {
      let shareString = `SumIt Streak: ${stats.currentStreak}\n`;
      shareString += `${gridSize}x${gridSize}\n`;
      // let shareString = `I won today's ${gridSize}x${gridSize} SumIt in ${moves} moves${moves <= bestThisSize ? ', my new best' : ''}!`;
      // if(stats && stats.currentStreak > 1) {
      //   shareString += ` I've won ${stats.currentStreak} games in a row!`;
      // }
      // shareString += '\n\n';
      shareString += '🟦🟦🟦🟦🟦\n';
      shareString += '🎉S U M I T🎉\n';
      shareString += `${numberString(moves)}\n`;
      shareString += '🎉🏔🏔🏔🎉\n';
      shareString += '🟦🟦🟦🟦🟦\n\n';
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
        setSnackbarMessage('Copied to Clipboard');
        setShowSnackbar(true);
      }
    } catch (ex) {
      setSnackbarMessage('Error Copying to Clipboard');
      setShowSnackbar(true);
    }
  };

  return (
    <>
      <Modal
        visible={props.visible}
        setShowModal={props.showModal}
        minWidth={500}
        maxWidth={700}
        minHeight={250}
        maxHeight={300}
      >
        <Text size='XXXL' weight='bold' color={colors.textDefault}>
          You Won!
        </Text>
        <Container style={{paddingTop: 20}}>
          <Text size='XL' color={colors.textDefault}>
            You beat today's {gridSize}x{gridSize} puzzle in {moves} moves{bestThisSize <= moves ? ', your new best!' : '!'}
          </Text>
        </Container>
        {stats && (
          <Container style={{paddingTop: 20}}>
            <Text size='XL' color={colors.textDefault}>
              {stats.currentStreak <= 1 ? (
                `While your current streak of wins is only 1, come back tomorrow to keep it going!`
              ) : (
                `Your current win-streak is ${stats.currentStreak}${stats.currentStreak >= stats.longestStreak ? ', your longest streak yet! Come back tomorrow to keep it going!' : ', come back tomorrow to keep it going!'}`
              )}
            </Text>
          </Container>
        )}
        <Container style={{paddingTop: 20}}>
          <Button variant="contained" size="large" style={{backgroundColor: colors.textHighlight}} onClick={() => shareWin()}>
            <Text size='XXL' weight='bold' color={colors.white}>
              Share
            </Text>
          </Button>
        </Container>
      </Modal>
      <Snackbar open={showSnackbar} onClose={handleSnackbarClose} message={snackbarMessage} severity='error' />
    </>
  );
}

export default WinnerModal;
