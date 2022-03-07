import React from "react";
import Divider from '@mui/material/Divider';
import { Text } from '../../components';
import { colorPalette, droppableCellPadding } from '../../consts';
import { getGridSize, getSquareSize, useViewport } from '../../utils';

const sumBorderWidth = 2;

const ShowSum = (target, sum, rotation, showSums) => {
	const colors = colorPalette();

	const gridSize = getGridSize();
	const { width, height } = useViewport();
	const squareSize = getSquareSize(height, width);
  const containerWidth = ((squareSize + (droppableCellPadding * 2)) * gridSize) - (droppableCellPadding * 2);

  if(!showSums) return null;

  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: containerWidth, transform: `rotate(${rotation}deg)`}}>
      <div style={{backgroundColor: sum === target ? colors.textHighlight : colors.primaryBlue, width: (containerWidth - 60) / 2, height: sumBorderWidth}} />
      <div style={{width: 60, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderWidth: sumBorderWidth, borderStyle: 'solid', borderRadius: 5, borderColor: sum === target ? colors.textHighlight : colors.primaryBlue}}>
        <Text size='XXL' weight='bold' color={sum === target ? colors.textHighlight : colors.primaryBlue}>
          {sum}
        </Text>
      </div>
      <div style={{backgroundColor: sum === target ? colors.textHighlight : colors.primaryBlue, width: (containerWidth - 60) / 2, height: sumBorderWidth}} />
    </div>
  )
}

export default ShowSum;
