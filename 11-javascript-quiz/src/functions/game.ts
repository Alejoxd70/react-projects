import { type Question } from '../types'

export const getBackgroundColor = (question: Question, index: number) => {
  const { userSelection, correctAnswer } = question

  // User has not selected an answer
  if (userSelection === undefined) return 'bg-secondary/50'

  // User has selected an answer and it is not the correct one
  if (userSelection !== index && correctAnswer !== index) return 'bg-secondary/50'

  // User has selected an answer and it is the correct one
  if (correctAnswer === index) return 'bg-green-500/30 text-primary/80'

  // User has selected an answer and it is not the correct one
  if (userSelection === index) return 'bg-red-500/30 text-primary/70'

  // Default case, should not happen
  return 'bg-secondary/50'
}
