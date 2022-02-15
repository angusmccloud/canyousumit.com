const setSeenHowToPlay = (seen) => {
  localStorage.setItem('howToPlay', JSON.stringify({seen}));
}

export default setSeenHowToPlay;
