const getGameStatus = (gameStatus) => {
  return JSON.parse(localStorage.getItem('gameStatus'));
}

export default getGameStatus;
