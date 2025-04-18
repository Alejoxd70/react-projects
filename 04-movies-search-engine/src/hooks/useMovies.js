import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

const useMovies = ({ search, sort }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const prevSearch = useRef(search)

  const getMovies = useCallback(async function ({ search }) {
    if (search === prevSearch.current) return
    try {
      setLoading(true)
      prevSearch.current = search
      const newMovies = await searchMovies({ search })
      if (!newMovies) {
        setMovies([])
        setLoading(false)
        return
      }
      setMovies(newMovies)
      setLoading(false)
    } catch (error) {
      throw new Error('Error fetching movies')
    }
  }, [])

  // const sortedMovies = sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
  // console.log('render sorted movies or movies')

  const sortedMoviesMemo = useMemo(() => {
    return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
  }, [movies, sort])

  return {
    movies: sortedMoviesMemo,
    getMovies,
    loading
  }
}

export { useMovies }
