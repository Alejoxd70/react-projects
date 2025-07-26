import { Game } from './components/Game'
import { JavaScriptIcon } from './components/Icons'
import { Start } from './components/Start'
import { useQuestionsStore } from './store/useQuestionsStore'

function App() {
  const { questions } = useQuestionsStore()
  return (
    <>
      <main className="p-6">
        <header>
          <div className="flex gap-2 justify-center items-center mb-8">
            <JavaScriptIcon />
            <h1 className="text-primary text-2xl md:text-4xl">JavaScript Quiz</h1>
          </div>
        </header>

        {/* Quiz */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-lg p-6">
            <h2 className="text-xl">Welcome to the JavaScript Quiz!</h2>
            <p className="">
              Test your knowledge of JavaScript fundamentals with this interactive quiz.
            </p>

            {questions.length === 0 && <Start />}
            {questions.length > 0 && <Game />}

          </div>
        </div>
      </main>
    </>
  )
}

export default App
