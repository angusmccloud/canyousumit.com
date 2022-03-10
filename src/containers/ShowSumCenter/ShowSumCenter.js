import React from "react";
import { Text, Container } from '../../components';
import { colorPalette } from '../../consts';

const sumBorderWidth = 2;
const cornerSize = 15;

const ShowSumCenter = (target, sum, showSums) => {
  const colors = colorPalette();
  const textColor = sum === target ? colors.textHighlight : colors.textDefault;
  const borderColor = sum === target ? colors.textHighlight : colors.primaryBlue;

  if (!showSums) return null;

  return (
    <Container style={{ position: 'relative', width: 60, height: 60}}>
      <Container style={{ position: 'absolute', width: cornerSize, height: cornerSize, pointerEvents: 'none', top: 0, left: 0, borderLeft: `${sumBorderWidth}px solid ${borderColor}`, borderTop: `${sumBorderWidth}px solid ${borderColor}`}} />
      <Container style={{ position: 'absolute', width: cornerSize, height: cornerSize, pointerEvents: 'none', top: 0, right: 0, borderRight: `${sumBorderWidth}px solid ${borderColor}`, borderTop: `${sumBorderWidth}px solid ${borderColor}`}} />
      <Container style={{ position: 'absolute', width: cornerSize, height: cornerSize, pointerEvents: 'none', bottom: 0, right: 0, borderRight: `${sumBorderWidth}px solid ${borderColor}`, borderBottom: `${sumBorderWidth}px solid ${borderColor}`}} />
      <Container style={{ position: 'absolute', width: cornerSize, height: cornerSize, pointerEvents: 'none', bottom: 0, left: 0, borderLeft: `${sumBorderWidth}px solid ${borderColor}`, borderBottom: `${sumBorderWidth}px solid ${borderColor}`}} />
      <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%'}}>
        <Text size='XXL' weight='bold' color={textColor}>
          {sum}
        </Text>
      </Container>
    </Container>
  )
}

export default ShowSumCenter;
