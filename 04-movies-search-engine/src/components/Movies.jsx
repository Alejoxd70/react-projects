const ListMovies = ({ movies }) => {
  return (
    <div className='movies-list'>
      {
        movies.map(movie => {
          const { id, title, poster, year } = movie
          if (poster === 'N/A') return null
          return (
            <div key={id} className='movie-card'>
              <a href={'https://www.imdb.com/title/' + id} target='_blank' rel='noreferrer'><img src={poster} alt={title + ' Image'} /></a>
              <h2> {title} {year}</h2>
            </div>
          )
        })
      }
    </div>
  )
}

const NoResults = () => {
  return (
    <p>No Movies found</p>
  )
}

const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListMovies movies={movies} />
      : <NoResults />

  )
}

export {
  Movies
}
