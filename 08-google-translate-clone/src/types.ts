import type { SUPPORTED_LANGUAGES, AUTO_LANGUAGE } from './constants'

export type ToLanguage = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = ToLanguage | AutoLanguage

export interface State {
  fromLanguage: FromLanguage
  toLanguage: ToLanguage
  inputText: string
  outputText: string
  isLoading: boolean
}
export type Action =
  | { type: 'SET_FROM_LANGUAGE', payload: FromLanguage }
  | { type: 'SET_TO_LANGUAGE', payload: ToLanguage }
  | { type: 'SET_INPUT_TEXT', payload: string }
  | { type: 'SET_OUTPUT_TEXT', payload: string }
  | { type: 'INTERCHANGE_LANGUAGES' }

export enum SectionType {
  From = 'from',
  To = 'to'
}