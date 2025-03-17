import { Square } from './components/Square'
import { Winner } from './components/Winner.jsx'
import { TURNS } from './constants.js'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { checkWinner, checkEndGame } from './logic/board.js'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage || TURNS.X
  })

  const [winner, setWinner] = useState(null)
  const updateBoard = index => {
    if (board[index] || winner) return

    // Update the board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    console.log(newBoard)

    // Change the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Save match
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // Check if there is a winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
      console.log(winner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const boardSpaces = board.map((_default, index) => (
    <Square
      key={index}
      index={index}
      updateBoard={updateBoard}
    >
      {_default}
    </Square>
  ))

  // reset the game
  const resetGame = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <>
      <main className='board'>
        <h1>Tic Tac Toe</h1>
        <section className='game'>
          {boardSpaces}
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>

          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>

        <Winner winner={winner} resetGame={resetGame} />
      </main>
    </>
  )
}

export default App
