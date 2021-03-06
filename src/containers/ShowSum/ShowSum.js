import React from "react";
import { Text, Container } from '../../components';
import { colorPalette, droppableCellPadding } from '../../consts';
import { getGridSize, getSquareSize, useViewport } from '../../utils';

const sumBorderWidth = 2;

const ShowSum = (target, sum, rotation, showSums) => {
  const colors = colorPalette();
  const gridSize = getGridSize();
  const { width, height } = useViewport();
  const squareSize = getSquareSize(height, width);
  const containerWidth = ((squareSize + (droppableCellPadding * 2)) * gridSize) - (droppableCellPadding * 2);
  const vertical = rotation === 90 || rotation === 270;

  if (!showSums) return null;

  return (
    <Container style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', justifyContent: 'center', alignItems: 'center', width: vertical ? undefined : containerWidth, height: vertical ? containerWidth : undefined }}>
      <Container style={{ backgroundColor: sum === target ? colors.textHighlight : colors.primaryBlue, width: vertical ? sumBorderWidth : (containerWidth - 60) / 2, height: vertical ? (containerWidth - 60) / 2 : sumBorderWidth }} />
      <Container style={{ width: vertical ? 30 : 60, height: vertical ? 60 : 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderWidth: sumBorderWidth, borderStyle: 'solid', borderRadius: 5, borderColor: sum === target ? colors.textHighlight : colors.primaryBlue }}>
        <Text size='XXL' weight='bold' color={sum === target ? colors.textHighlight : colors.textDefault} rotation={rotation === 180 ? 0 : rotation}>
          {sum}
        </Text>
      </Container>
      <Container style={{ backgroundColor: sum === target ? colors.textHighlight : colors.primaryBlue, width: vertical ? sumBorderWidth : (containerWidth - 60) / 2, height: vertical ? (containerWidth - 60) / 2 : sumBorderWidth }} />
    </Container>
  )
}

export default ShowSum;
