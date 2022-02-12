import { getGameHistory } from '../';

const setGameHistory = (date, won, gridSize, moves) => {
  // Current Game Object
  const game = {
    date, 
    won,
    gridSize,
    moves
  };
  // console.log('-- Setting Game STatus for this game --', game);

  // Get`History
  const history = getGameHistory();
  // console.log('-- History before changes --', history);

  // Remove the current record
  const newHistory = history.filter((h) => h.date.year !== date.year || h.date.month !== date.month || h.date.day !== date.day );
  // console.log('-- History With Today Removed --', newHistory);
  
  // Then push in the new record
  newHistory.push(game);
  // console.log('-- And New Today Added --', newHistory);

  // RESET HISTORY - DEV ONLY
  // localStorage.setItem('gameHistory', JSON.stringify([]));

  // And finally, let's load it into storage
  localStorage.setItem('gameHistory', JSON.stringify(newHistory));
}

export default setGameHistory;
