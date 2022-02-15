const getSeenHowToPlay = () => {
  const howToPlay = JSON.parse(localStorage.getItem('howToPlay'));
  return howToPlay || false;
}

export default getSeenHowToPlay;
