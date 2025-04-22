import { useState, useEffect, useContext } from 'react'
import { FiltersContext } from '../context/FiltersProvider'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const { filters, setFilters } = useContext(FiltersContext)

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice && (filters.category === 'all' || product.category === filters.category)
      )
    })
  }

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then(data => {
        console.log(data)
        setProducts(data.products)
      })
  }, [])

  const filteredProducts = filterProducts(products)

  return { filteredProducts, setFilters, filters }
}
