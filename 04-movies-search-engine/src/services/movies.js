const API_URL = 'https://www.omdbapi.com/?apikey=6a2be3b1'

export const searchMovies = async ({ search }) => {
  if (search === '') return
  try {
    const res = await fetch(API_URL + `&s=${search}`)
    const data = await res.json()
    console.log(data)
    const { Response } = data
    if (Response === 'False') {
      return false
    }
    const movies = data.Search

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year
    }))
  } catch (error) {
    throw new Error('Error fetching movies')
  }
}
