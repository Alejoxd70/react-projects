import { useQuestionsStore } from '../store/useQuestionsStore'

export const Footer = () => {
  const { questions, resetGame } = useQuestionsStore()

  let correctAnswers = 0
  let incorrectAnswers = 0
  let unanswered = 0

  questions.forEach((question) => {
    const { correctAnswer, userSelection } = question
    if (userSelection == null) unanswered++
    else if (userSelection === correctAnswer) correctAnswers++
    else incorrectAnswers++
  })

  return (
    <footer>
      <div className="text-center mt-3">
        ✅:
        {correctAnswers}
        {' '}
        ❌:
        {incorrectAnswers}
        {' '}
        🤷:
        {unanswered}
      </div>

      <div className="text-center mt-3">
        <button
          className="mt-6 px-6 py-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors cursor-pointer "
          onClick={resetGame}
        >
          Reset Quiz
        </button>
      </div>

    </footer>
  )
}
