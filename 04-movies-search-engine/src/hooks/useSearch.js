import { useState, useEffect, useRef } from 'react'

const useSearch = () => {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('Please enter a search term')
      return
    }
    if (search.length <= 3) {
      setError('Please enter at least 3 characters')
      return
    }
    setError(null)
  }, [search])

  return { search, setSearch, error }
}

export { useSearch }
