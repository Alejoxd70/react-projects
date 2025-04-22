import './Filters.css'
import { useProducts } from '../hooks/useProducts'

export const Filters = () => {
  const { filters: { minPrice }, setFilters } = useProducts()

  const handleChangeMinPrice = e => {
    const value = e.target.value
    setFilters(prev => ({
      ...prev,
      minPrice: value
    }))
  }

  const handleChangeCategory = e => {
    const value = e.target.value
    setFilters(prev => ({
      ...prev,
      category: value
    }))
  }
  return (
    <section className='filters'>
      <div>
        <label htmlFor='price'>Price</label>
        <input
          type='range'
          id='price'
          min={0}
          max={1000}
          onChange={handleChangeMinPrice}
          value={minPrice}
        />
        <output>{'$' + minPrice}</output>
      </div>
      <div>
        <label htmlFor='category'>Category</label>
        <select id='category' onChange={handleChangeCategory}>
          <option value='all'>All</option>
          <option value='beauty'>Beauty</option>
          <option value='groceries'>Groceries</option>
        </select>
      </div>
    </section>
  )
}
