import { useQuestionsStore } from '../store/useQuestionsStore'
import type { Question as QuestionType } from '../types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { pojoaque } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { getBackgroundColor } from '../functions/game'
import { ArrowLeftIcon, ArrowRightIcon } from './Icons'
import { Footer } from './Footer'

interface QuestionProps {
  question: QuestionType
}

const Question = ({ question }: QuestionProps) => {
  const { selectedAnswer } = useQuestionsStore()

  const handleAnswerClick = (answerIndex: number) => {
    selectedAnswer?.(question.id, answerIndex)
  }

  return (
    <>
      <div>
        <h2 className="text-lg font-medium mb-3">{question.question}</h2>

        <SyntaxHighlighter language="javascript" style={pojoaque} customStyle={{ borderRadius: '8px', padding: '1rem' }}>
          {question.code}
        </SyntaxHighlighter>

        <ol className="list-none text-center mt-3">
          {question.answers.map((answer, index) => (
            <li key={index} className="border-b border-b-accent/15">
              <button
                className={`p-2 text-accent text-lg font-medium hover: w-full cursor-pointer  ${getBackgroundColor(question, index)}`}
                onClick={() => handleAnswerClick(index)}
                disabled={question.userSelection !== undefined}
              >
                {answer}
              </button>

            </li>
          ))}
        </ol>
      </div>
    </>
  )
}

export const Game = () => {
  const { questions, currentQuestionIndex, nextQuestion, previousQuestion } = useQuestionsStore()
  const currentQuestion = questions[currentQuestionIndex]
  
  
  return (
    <>
      <div className="mt-5">

        <div className="flex items-center justify-center gap-2 mb-3">
          <button
            className="p-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeftIcon />
          </button>

          <div>
            <p>
              {currentQuestionIndex + 1}
              {' '}
              /
              {' '}
              {questions.length}
            </p>

          </div>

          <button
            className="p-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={nextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            <ArrowRightIcon />
          </button>
        </div>

        <Question question={currentQuestion} />

        <Footer />

      </div>
    </>
  )
}
