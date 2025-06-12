import { useReducer } from 'react'
import type { State, Action, FromLanguage, ToLanguage } from '../types'
import { AUTO_LANGUAGE } from '../constants'

// create an initial state for the reducer
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'es',
  inputText: '',
  outputText: '',
  isLoading: false
}

// create a reducer function to handle state changes
const reducer = (state: State, action: Action) => {
  const { type } = action
  switch (type) {
    case 'INTERCHANGE_LANGUAGES':
      if (state.fromLanguage === AUTO_LANGUAGE) return state

      const isLoadingInput = state.inputText.trim() !== ''

      return {
        ...state,
        isLoading: isLoadingInput,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        inputText: state.outputText,
        outputText: ''
      }
    case 'SET_FROM_LANGUAGE':
      if (state.fromLanguage === action.payload) return state
      const loading = state.inputText.trim() !== ''
      return {
        ...state,
        isLoading: loading,
        fromLanguage: action.payload,
        outputText: ''
      }
    case 'SET_TO_LANGUAGE':
      if (state.toLanguage === action.payload) return state
      const loadingTo = state.inputText.trim() !== ''
      return {
        ...state,
        isLoading: loadingTo,
        toLanguage: action.payload,
        outputText: ''
      }
    case 'SET_INPUT_TEXT':
      const isLoading = action.payload.trim() !== ''
      return {
        ...state,
        isLoading,
        inputText: action.payload,
        outputText: ''
      }
    case 'SET_OUTPUT_TEXT':
      return {
        ...state,
        isLoading: true,
        outputText: action.payload
      }
    default:
      return state
  }
}

export const useTranslationReducer = () => {
  const [{
    isLoading,
    fromLanguage,
    outputText,
    inputText,
    toLanguage
  }, dispatch] = useReducer(reducer, initialState)

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: ToLanguage) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }


  const setInputText = (text: string) => {
    dispatch({ type: 'SET_INPUT_TEXT', payload: text })
  }

  const setOutputText = (text: string) => {
    dispatch({ type: 'SET_OUTPUT_TEXT', payload: text })
  }

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  return {
    isLoading,
    fromLanguage,
    outputText,
    inputText,
    toLanguage,
    setFromLanguage,
    setToLanguage,
    interchangeLanguages,
    setInputText,
    setOutputText
  }
}