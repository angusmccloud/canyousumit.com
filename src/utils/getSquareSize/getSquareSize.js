import { getGridSize, getSettings } from '../../utils';
import { droppableCellPadding } from '../../consts';

const maxSquareSize = 75;
const minSquareSize = 25;
const padding = 10;

const getSquareSize = (height, width) => {
  const settings = getSettings();
  const gridSize = getGridSize();
  const extraPadding = settings.showSums ? 60 + (droppableCellPadding * 2) : 0;
  const squareSize = Math.min(
    maxSquareSize,
    Math.max(
      minSquareSize,
      Math.min(
        // Math.floor(((width - padding - extraPadding) * (gridSize / (gridSize + 1))) / gridSize),
        // Math.floor(((height - padding - extraPadding) * (gridSize / (gridSize + 1))) / gridSize),
        Math.floor(width - padding - extraPadding - (gridSize * droppableCellPadding * 2)) / gridSize,
        Math.floor(height - padding - extraPadding - (gridSize * droppableCellPadding * 2)) / gridSize,

      )
    )
  );

  return squareSize;
}

export default getSquareSize;

// 211
// 91

// 222