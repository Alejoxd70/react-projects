import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import { useState, useEffect, useCallback } from 'react'
import debounce from 'just-debounce-it'

const App = () => {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const getMoviesDebounced = useCallback(debounce(({ newSearch }) => {
    getMovies({ search: newSearch })
  }, 500),
  [])

  const handleInput = e => {
    const newSearch = e.target.value
    if (newSearch.startsWith(' ')) return

    setSearch(newSearch)
    getMoviesDebounced({ newSearch })
  }

  const handleSubmit = e => {
    e.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  useEffect(() => {
    console.log('new getMovies received')
  }, [getMovies])

  return (
    <>
      <div className='page'>
        <h1>Movies search engine</h1>
        <header>
          <form className='form' onSubmit={handleSubmit}>
            <input onChange={handleInput} value={search} type='text' placeholder='Search a movie' />
            <input type='checkbox' onChange={handleSort} checked={sort} />
            <button type='submit' disabled={error}> Search</button>
          </form>
          {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
        </header>

        <main>
          {loading ? <span className='loader'>Loading...</span> : <Movies movies={movies} />}
        </main>
      </div>
    </>
  )
}
export {
  App
}
