const setGameStatus = (gameStatus) => {
  localStorage.setItem('gameStatus', JSON.stringify(gameStatus));
}

export default setGameStatus;
