import React from "react";
import { Text, Container, Modal } from '../../components';
import { colorPalette } from '../../consts';
import instructions1 from '../../assets/images/instructions-1.png';
import instructions2Left from '../../assets/images/instructions-2-left.png';
import instructions2Right from '../../assets/images/instructions-2-right.png';
import instructions3Left from '../../assets/images/instructions-3-left.png';
import instructions3Right from '../../assets/images/instructions-3-right.png';
import instructions4 from '../../assets/images/instructions-4.png';

const InfoModal = (props) => {
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
          How to Play
        </Text>
        <Container style={{paddingTop: 20, display: 'flex', flexDirection: 'row'}}>
          <img src={instructions1} alt="Instructions (Drag the Numbers)" height={200} style={{paddingRight: 20}} />
          <Text size='L' color={colors.textDefault}>
            Drag the numbers from the bank into spots in the square.
          </Text>
        </Container>
        <Container style={{paddingTop: 20}}>
          <Text size='L' color={colors.textDefault}>
            Complete the square by correctly filling in all the open spots so that:
          </Text>
        </Container>
        <Container style={{paddingTop: 10, display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text size='L' color={colors.textDefault}>The</Text>
          <Text size='L' weight='bold' color={colors.textHighlight}>&nbsp;sum&nbsp;</Text>
          <Text size='L' color={colors.textDefault}>of each</Text>
          <Text size='L' weight='bold' color={colors.textHighlight}>&nbsp;column&nbsp;</Text>
          <Text size='L' color={colors.textDefault}>= the</Text>
          <Text size='L' weight='bold' color={colors.textHighlight}>&nbsp;center number</Text>
        </Container>
        <Container style={{display: 'flex', flexDirection: 'row', paddingTop: 10, justifyContent: 'space-evenly'}}>
          <img src={instructions2Left} alt="Instructions (Each Column Sums to Match the Center Number)" height={150} />
          <img src={instructions2Right} alt="Instructions (Each Column Sums to Match the Center Number)" height={150} />
        </Container>
        <Container style={{paddingTop: 10, display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text size='L' color={colors.textDefault}>The</Text>
          <Text size='L' weight='bold' color={colors.textHighlight}>&nbsp;sum&nbsp;</Text>
          <Text size='L' color={colors.textDefault}>of each</Text>
          <Text size='L' weight='bold' color={colors.textHighlight}>&nbsp;row&nbsp;</Text>
          <Text size='L' color={colors.textDefault}>= the </Text>
          <Text size='L' weight='bold' color={colors.textHighlight}>&nbsp;center number</Text>
        </Container>
        <Container style={{display: 'flex', flexDirection: 'row', paddingTop: 10, justifyContent: 'space-evenly'}}>
          <img src={instructions3Left} alt="Instructions (Each Row Sums to Match the Center Number)" height={150} />
          <img src={instructions3Right} alt="Instructions (Each Row Sums to Match the Center Number)" height={150} />
        </Container>
        <Container style={{paddingTop: 10, display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text size='L' color={colors.textDefault}>The</Text>
          <Text size='L' weight='bold' color={colors.textHighlight}>&nbsp;sum&nbsp;</Text>
          <Text size='L' color={colors.textDefault}>of all the</Text>
          <Text size='L' weight='bold' color={colors.textHighlight}>&nbsp;corners&nbsp;</Text>
          <Text size='L' color={colors.textDefault}>= the </Text>
          <Text size='L' weight='bold' color={colors.textHighlight}>&nbsp;center number</Text>
        </Container>
        <Container style={{display: 'flex', flexDirection: 'row', paddingTop: 10, justifyContent: 'space-evenly'}}>
          <img src={instructions4} alt="Instructions (The Four Corners Sums to Match the Center Number)" height={150}/>
        </Container>
        <Container style={{paddingTop: 10, display: 'flex', flexDirection: 'row'}}>
          <Text size='L' color={colors.textDefault}>Solve the puzzle by filling in the square in as few moves as possible!</Text>
        </Container>
      </>
    </Modal>
  );
}

export default InfoModal;
