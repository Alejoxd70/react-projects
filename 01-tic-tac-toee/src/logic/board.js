import { WINNER_COMBINATIONS } from '../constants.js'

const checkWinner = boardToCheck => {
  for (const combo of WINNER_COMBINATIONS) {
    const [a, b, c] = combo
    if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
      return boardToCheck[a] // winner
    }
  }

  // if there is no winner
  return null
}

const checkEndGame = boardToCheck => {
  return boardToCheck.every(item => item !== null)
}

export {
  checkWinner,
  checkEndGame
}
