import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Question } from '../types'

interface QuestionsState {
  questions: Question[]
  currentQuestionIndex: number
  fetchQuestions: (limit: number) => Promise<void>
  selectedAnswer?: (questionId: number, answerIndex: number) => void
  nextQuestion: () => void
  previousQuestion: () => void
  resetGame?: () => void
}

export const useQuestionsStore = create<QuestionsState>()(persist((set, get) => ({
  questions: [],

  currentQuestionIndex: 0,

  fetchQuestions: async (limit: number) => {
    const response = await fetch('http://localhost:5173/data.json')
    const data = await response.json()

    const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)
    set(state => ({ ...state, questions }))
  },

  selectedAnswer: (questionId, answerIndex) => {
    const { questions } = get()

    const newQuestions = structuredClone(questions)

    const questionIndex = newQuestions.findIndex(q => q.id === questionId)

    const questionInfo = newQuestions[questionIndex]

    const isCorrect = questionInfo.correctAnswer === answerIndex

    newQuestions[questionIndex] = {
      ...questionInfo,
      userSelection: answerIndex,
      isCorrect,
    }

    set(state => ({ ...state, questions: newQuestions }))
  },

  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get()
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 })
    }
  },

  previousQuestion: () => {
    const { currentQuestionIndex } = get()
    if (currentQuestionIndex >= 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 })
    }
  },

  resetGame: () => {
    set({
      questions: [],
      currentQuestionIndex: 0,
    })
  },
}), {
  name: 'questions',
}),
)
