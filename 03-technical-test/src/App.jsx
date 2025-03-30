import { useCatImage } from './hooks/useCatImage.js'
import { useCatFact } from './hooks/useCatFact.js'

const App = () => {
  const { catFact, refreshFact } = useCatFact()
  const { catImageUrl } = useCatImage({ catFact })

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <>
      <h1>CAT APP</h1>
      <main>
        {catFact &&
          <>
            <button onClick={handleClick}>Next fact</button>
            <p>{catFact}</p>
            <div className='cat-image'>
              {catImageUrl &&
                <img src={catImageUrl} alt='Cat image using API ' />}
            </div>
          </>}
      </main>
    </>
  )
}

export {
  App
}
