import { Square } from './Square'

export const Winner = ({ winner, resetGame }) => {
  if (winner === null) return null

  const winnerText = winner ? `Player ${winner} wins!` : 'It\'s a Tie!'

  return (
    <>
      <section className='winner'>
        <div className='text'>
          <h2>
            {winnerText}
          </h2>

          <header className='win'>
            {winner && <Square>{winner}</Square>}
          </header>

          <footer>
            <button onClick={resetGame}>Try again!</button>
          </footer>
        </div>

      </section>
    </>
  )
}
