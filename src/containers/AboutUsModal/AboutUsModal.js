import React from "react";
import Modal from 'react-modal';
// import { styles } from '../../consts';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import Divider from '@mui/material/Divider';
import { Text } from '../../components';
import { colorPalette } from '../../consts';
import { useViewport } from '../../utils';
import aboutus from '../../assets/images/aboutus.png';

const AboutUsModal = (props) => {
  const colors = colorPalette();
  const handleClose = () => {
    // console.log('-- Close --');
    props.showModal(false);
  }
  const { width, height } = useViewport();

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
          minWidth: width < 500 ? width * .9 : 500,
          maxWidth: width > 700 ? 700 : width * .9,
          minHeight: height < 700 ? height * .9 : 700,
          maxHeight: height > 600 ? 600 : height * .9,
          bgcolor: colors.white,
          border: '2px solid #000',
          borderRadius: 20,
          borderColor: colors.darkBlue,
        }
      }}
      contentLabel="Instructions Modal"
    >
      <>
        <Text size='XXXL' weight='bold' color={colors.darkBlue}>
          About SUMIT
        </Text>
        <div style={{paddingTop: 20, display: 'flex', flexDirection: 'row'}}>
          <Text size='L' color={colors.darkBlue}>
            SUMIT was born in the Colorado Rockies as the product of an impromptu think tank  comprised of four game-loving friends on vacation from Boston. In the mornings, three of us could reliably be found playing Wordle and comparing scores while the fourth played sudoku. We loved the accessible, interactive, daily routine of Wordle and decided to create a numbers game that our numbers-loving friend could get excited about.
          </Text>
        </div>
        <div style={{paddingTop: 20, display: 'flex', flexDirection: 'row'}}>
          <Text size='L' color={colors.darkBlue}>
            Anna and Indy’s design skills paired Connor’s application development experience and idle hands made for the perfect storm for generating a unique game that could be shared widely. James valiantly cheered us on from the sidelines, functioned as our prototype guinea pig, and made dinner most evenings. At one point during development, Anna drove the team through a blizzard for four hours under the guidance of Colorado-native Indy while Connor continued to code in the back seat and James periodically got out of the car to clean off the mangled windshield wipers.
          </Text>
        </div>
        <div style={{paddingTop: 20, display: 'flex', flexDirection: 'row'}}>
          <Text size='L' color={colors.darkBlue}>
            SUMIT was a labor of love and has been a unexpectedly satisfying souvenir from a very memorable trip. The sideways sigma logo and name for the game were developed as punny references to the peaks on which the addition puzzle originated. We hope SUMIT brings a bit of joy (and perhaps strife) to your mornings like it has for us!
          </Text>
        </div>
        <div style={{paddingTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <img src={aboutus} alt="About Us" style={{width: '100%'}}/>
        </div>
        <Divider style={{marginTop: 20, marginBottom: 20}} />
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
         <IconButton
            size='small'
            edge="end"
            aria-label="Twitter"
            onClick = {() => window.open('https://twitter.com/connortyrrell')}
            // onClick={() => setShowSettingsModal(true)}
            style={{color: colors.twitterBlue, paddingRight: 10}}
          >
            <TwitterIcon />
          </IconButton>
          <Text size='M' color={colors.darkBlue}>
            Need Help? Have Feedback? Find me on Twitter!
          </Text>
        </div>
      </>
    </Modal>
  );
}

export default AboutUsModal;
