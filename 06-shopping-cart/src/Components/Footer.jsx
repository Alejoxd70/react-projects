import { useProducts } from '../hooks/useProducts'
import { useCart } from '../hooks/useCart'
import './Footer.css'
export const Footer = () => {
  const { filters: { category, minPrice } } = useProducts()
  const { cart } = useCart()

  return (
    <footer className='footer'>
      {/* <h4>React ⚛️ － <span>@alejo{JSON.stringify(cart, null, 2)}</span></h4> */}
      <h5>Shopping Cart with useContext & useReducer Filters: {category + minPrice}</h5>
    </footer>
  )
}
