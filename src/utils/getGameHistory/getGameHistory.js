const getGameHistory = () => {
  const history = JSON.parse(localStorage.getItem('gameHistory'));
  return history || [];
}

export default getGameHistory;
