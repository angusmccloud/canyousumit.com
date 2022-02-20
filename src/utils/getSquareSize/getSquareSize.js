import { getGridSize } from '../../utils';

const maxSquareSize = 75;
const minSquareSize = 25;
const padding = 20;

const getSquareSize = (height, width) => {
  const gridSize = getGridSize();
  const squareSize = Math.min(
    maxSquareSize,
    Math.max(
      minSquareSize,
      Math.min(
        Math.floor(((width - padding) * (gridSize / (gridSize + 1))) / gridSize),
        Math.floor(((height - padding) * (gridSize / (gridSize + 1))) / gridSize),
      )
    )
  );

  return squareSize;
}

export default getSquareSize;