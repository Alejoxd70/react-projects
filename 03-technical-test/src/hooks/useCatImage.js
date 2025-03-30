import { useState, useEffect } from 'react'
const useCatImage = ({ catFact }) => {
  const [catImageUrl, setCatImageUrl] = useState(null)

  // Retrieve the words from the fact
  useEffect(() => {
    if (!catFact) return

    const words = catFact.split(' ', 3).join(' ')
    console.log(words)
    fetch(`https://cataas.com/cat/says/${words}?json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        setCatImageUrl(url)
        console.log(url)
      })
  }, [catFact])

  return { catImageUrl }
}
export { useCatImage }
