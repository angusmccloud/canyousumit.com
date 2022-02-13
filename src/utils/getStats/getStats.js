import { dateInfo, getGameHistory } from '../';

const getStats = () => {
  const statsByGridSize = (gridSize, gameHistory, today) => {
    const history = gameHistory.filter((g) => g.gridSize === gridSize);
    // console.log(`-- Grid Size ${gridSize} History --`, history);
    const wins = history.filter((g) => g.won);
    const losses = history.filter((g) => !g.won && !(g.date.year === today.year && g.date.month === today.month && g.date.day === today.day));
    wins.sort((a, b) => a.moves - b.moves);
    let winsTotalMoves = 0;
    for(let i = 0; i < wins.length; i++) {
      winsTotalMoves += wins[i].moves;
    }
    return {
      gridSize,
      totalGames: wins.length + losses.length,
      wins: wins.length,
      losses: losses.length,
      fewestMoves: wins.length > 0 ? wins[0].moves : 0,
      averageMoves: wins.length > 0 ? winsTotalMoves / wins.length : 0,
    }
  };

  const streakStats = (gameHistory, today, yesterday) => {
    const wonGames = gameHistory.filter((g) => g.won);
    let longestStreak = 0;
    let currentStreak = 0;

    if(wonGames.length > 0) {

      wonGames.sort((a, b) => b.date.year - a.date.year || b.date.month - a.date.month || b.date.day - a.date.day);
      // console.log('-- Won Games in Streaks --', wonGames);

      // Calculate the Current Streak (if there is one)
      if((wonGames[0].date.year === today.year && wonGames[0].date.month === today.month && wonGames[0].date.day === today.day) || (wonGames[0].date.year === yesterday.year && wonGames[0].date.month === yesterday.month && wonGames[0].date.day === yesterday.day)) {
        // Last won game was today or yesterday, there is indeed a Current Streak
        currentStreak = 1;
        const compareDate = new Date(wonGames[0].date.year, wonGames[0].date.month, wonGames[0].date.day);
        for(let i = 1; i < wonGames.length; i++) { 
          compareDate.setDate(compareDate.getDate() - 1);
          // console.log('-- Compare Date --', compareDate);
          if(wonGames[i].date.year === compareDate.getFullYear() && wonGames[i].date.month === compareDate.getMonth() && wonGames[i].date.day === compareDate.getDate()) {
            currentStreak += 1;
          } else {
            // console.log('-- Streak Broken!! --');
            break;
          }
        }
      };

      // Let's calculate the longest streak
      let compareDate = new Date(wonGames[0].date.year, wonGames[0].date.month, wonGames[0].date.day);
      let thisStreak = 1;
      for(let i = 1; i < wonGames.length; i++) {
        compareDate.setDate(compareDate.getDate() - 1);
        if(wonGames[i].date.year === compareDate.getFullYear() && wonGames[i].date.month === compareDate.getMonth() && wonGames[i].date.day === compareDate.getDate()) {
          thisStreak += 1;
        } else {
          // console.log(`-- Streak Broken at ${thisStreak} !! ...Let\'s Start Again! --`);
          longestStreak = thisStreak > longestStreak ? thisStreak : longestStreak;
          thisStreak = 1;
          compareDate = new Date(wonGames[i].date.year, wonGames[i].date.month, wonGames[i].date.day);
          // break;
        }
      }
      // And the final streak, set as longest if it is
      // console.log(`-- Final Streak at ${thisStreak}`);
      longestStreak = thisStreak > longestStreak ? thisStreak : longestStreak;
    }

    return {
      longestStreak,
      currentStreak,
    }
  }

  const dtInfo = dateInfo();
  const gameHistory = getGameHistory();

  // Get stats by Grid Size
  const gridSizeStats = [];
  let allWins = 0;
  let allLosses = 0;
  for(let i = 4; i <= 6; i++) {
    // Grids are currently 4, 5, or 6
    // Change this loop range if we make them bigger or smaller
    const statsThisGrid = statsByGridSize(i, gameHistory, dtInfo.today);
    gridSizeStats.push(statsThisGrid);
    allWins += statsThisGrid.wins;
    allLosses += statsThisGrid.losses;
  }
  gridSizeStats.push({
    gridSize: 'all',
    totalGames: allWins + allLosses,
    wins: allWins,
    losses: allLosses,
    fewestMoves: 0,
    averageMoves: 0
  });

  const streaks = streakStats(gameHistory, dtInfo.today, dtInfo.yesterday);

  const response = {
    longestStreak: streaks.longestStreak,
    currentStreak: streaks.currentStreak,
    statsByGridSize: gridSizeStats,
  };

  console.log('-- Calculated Stats Response --', response);
  return response;
}

export default getStats;