import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/fact.js'

const useCatFact = () => {
  const [catFact, setCatFact] = useState()

  // Retrieve fact
  const refreshFact = async () => {
    // promise mode
    // getRandomFact().then(newFact => setCatFact(newFact))
    const fact = await getRandomFact()
    setCatFact(fact)
  }

  useEffect(() => {
    refreshFact()
  }, [])

  return { catFact, refreshFact }
}

export { useCatFact }
