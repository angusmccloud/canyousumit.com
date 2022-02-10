import { dateInfo } from '../../utils';

const getGridSize = () => {
  const dtInfo = dateInfo();
  let gridSize = 4;
  if(dtInfo.dayOfWeek === 0) {
    gridSize = 6
  } else if (dtInfo.dayOfWeek === 6 || dtInfo.dayOfWeek === 5) {
    gridSize = 5
  }

  return gridSize;
}

export default getGridSize;