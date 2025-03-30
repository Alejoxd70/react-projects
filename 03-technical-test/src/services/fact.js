const CAT_API_RANDOM_FACT = 'https://catfact.ninja/fact'

const getRandomFact = async () => {
  try {
    const res = await fetch(CAT_API_RANDOM_FACT)
    const data = await res.json()
    const { fact } = data
    return fact
  } catch (error) {
    return error
  }
}

export {
  getRandomFact
}
