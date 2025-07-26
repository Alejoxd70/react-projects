import { useQuestionsStore } from '../store/useQuestionsStore'
import { QUIZ_QUESTIONS } from '../constants'

export const Start = () => {
  const { fetchQuestions } = useQuestionsStore()

  const handleClickStart = () => {
    fetchQuestions(QUIZ_QUESTIONS)
  }
  return (
    <>
      <button
        className="mt-6 px-6 py-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors cursor-pointer"
        onClick={handleClickStart}
      >
        Start Quiz
      </button>
    </>
  )
}
