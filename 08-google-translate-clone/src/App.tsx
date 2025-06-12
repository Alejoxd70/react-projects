import './App.css'
import { AUTO_LANGUAGE, VOICE_LANGUAGES } from './constants'
import { useTranslationReducer } from './hooks/useTranslationReducer'
import { ArrowIcon, ClipBoardIcon, VoiceIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

const App = () => {
  // use the useTranslationReducer hook to manage state
  const {
    isLoading,
    inputText,
    outputText,
    fromLanguage,
    toLanguage,
    setInputText,
    setOutputText,
    setFromLanguage,
    setToLanguage,
    interchangeLanguages
  } = useTranslationReducer()

  const debouncedInputText = useDebounce(inputText, 500)

  useEffect(() => {
    if (debouncedInputText.trim() === '') return

    translate({ fromLanguage, toLanguage, text: debouncedInputText })
      .then((result => {
        if (result == null) return
        setOutputText(result)
      }))
      .catch((error) => {
        console.error('Error during translation:', error)
        setOutputText('Error during translation')
      })

  }, [debouncedInputText, fromLanguage, toLanguage])

  const handleClipBoardCopy = () => {
    navigator.clipboard.writeText(outputText)
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(outputText)
    utterance.lang = VOICE_LANGUAGES[toLanguage] || 'en-US' // Default to English if language not supported
    console.log(utterance)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <>
      <main className='text-gray-900 dark:text-white'>
        <h1
          className='text-3xl inline-block bg-gradient-to-r from-accent from-10% via-accent/70 via-30% to-secondary to-90% text-transparent bg-clip-text font-black'>
          Google translate Clone
        </h1>

        {/* grid translate */}
        <div className='flex justify-center gap-2  mt-5'>

          <div className='w-60'>
            <LanguageSelector
              onChange={setFromLanguage}
              value={fromLanguage}
              type={SectionType.From}
            />
            <TextArea
              type={SectionType.From}
              onChange={setInputText}
              value={inputText}
            />
          </div>

          <div>
            <button
              className='bg-secondary/90 text-white font-bold p-1 rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1'
              disabled={fromLanguage === AUTO_LANGUAGE}
              onClick={interchangeLanguages}
            >
              <ArrowIcon />
            </button>
          </div>

          <div className='w-60'>
            <LanguageSelector
              onChange={setToLanguage}
              type={SectionType.To}
              value={toLanguage}
            />
            <div className="relative">
              <TextArea
                onChange={setOutputText}
                loading={isLoading}
                type={SectionType.To}
                value={outputText}
              />
              <div className='absolute bottom-3 left-2 flex gap-2'>
                <button
                  className=' bg-secondary/90 text-white font-bold p-2 rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  onClick={handleClipBoardCopy}
                  disabled={outputText.trim() === ''}
                >
                  <ClipBoardIcon />
                </button>
                <button
                  className='bg-secondary/90 text-white font-bold p-2 rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  onClick={handleSpeak}
                  disabled={outputText.trim() === ''}
                >
                  <VoiceIcon />
                </button>
              </div>

            </div>
          </div>
        </div>


      </main>
    </>
  )
}

export default App
