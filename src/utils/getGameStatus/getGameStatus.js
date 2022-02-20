const getGameStatus = () => {
  const gameStatus = JSON.parse(localStorage.getItem('gameStatus'));
  console.log('-- gameStatus from Local Storage --', gameStatus);
  return gameStatus;
}

export default getGameStatus;
