import React from "react";
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import Divider from '@mui/material/Divider';
import { Text, Container, Modal } from '../../components';
import { colorPalette } from '../../consts';
import aboutus from '../../assets/images/aboutus.png';

const AboutUsModal = (props) => {
  const colors = colorPalette();

  return (
    <Modal
      visible={props.visible}
      setShowModal={props.showModal}
      minWidth={500}
      maxWidth={700}
      minHeight={600}
      maxHeight={1000}
    >
      <>
        <Text size='XXXL' weight='bold' color={colors.textDefault}>
          About SUMIT
        </Text>
        <Container style={{paddingTop: 20, display: 'flex', flexDirection: 'row'}}>
          <Text size='L' color={colors.textDefault}>
            SUMIT was born in the Colorado Rockies as the product of an impromptu think tank  comprised of four game-loving friends on vacation from Boston. In the mornings, three of us could reliably be found playing Wordle and comparing scores while the fourth played sudoku. We loved the accessible, interactive, daily routine of Wordle and decided to create a numbers game that our numbers-loving friend could get excited about.
          </Text>
        </Container>
        <Container style={{paddingTop: 20, display: 'flex', flexDirection: 'row'}}>
          <Text size='L' color={colors.textDefault}>
            Anna and Indy’s design skills paired Connor’s application development experience and idle hands made for the perfect storm for generating a unique game that could be shared widely. James valiantly cheered us on from the sidelines, functioned as our prototype guinea pig, and made dinner most evenings. At one point during development, Anna drove the team through a blizzard for four hours under the guidance of Colorado-native Indy while Connor continued to code in the back seat and James periodically got out of the car to clean off the mangled windshield wipers.
          </Text>
        </Container>
        <Container style={{paddingTop: 20, display: 'flex', flexDirection: 'row'}}>
          <Text size='L' color={colors.textDefault}>
            SUMIT was a labor of love and has been a unexpectedly satisfying souvenir from a very memorable trip. The sideways sigma logo and name for the game were developed as punny references to the peaks on which the addition puzzle originated. We hope SUMIT brings a bit of joy (and perhaps strife) to your mornings like it has for us!
          </Text>
        </Container>
        <Container style={{paddingTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <img src={aboutus} alt="About Us" style={{width: '100%', borderRadius: 10}}/>
        </Container>
        <Divider style={{marginTop: 20, marginBottom: 20,}} color={colors.divider} />
        <Container style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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
          <Text size='M' color={colors.textDefault}>
            Need Help? Have Feedback? Reach out to Connor on Twitter!
          </Text>
        </Container>
      </>
    </Modal>
  );
}

export default AboutUsModal;
