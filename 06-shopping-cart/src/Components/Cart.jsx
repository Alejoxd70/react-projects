import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.js'
import './Cart.css'

export const Cart = () => {
  const cartCheckboxId = useId()
  const { cart, addToCart, clearCart, deleteProduct, totalPrice } = useCart()

  const cartList = cart.map(product => (
    <li key={product.id}>
      <img src={product.thumbnail} />
      <div>
        <strong>{product.title}</strong>
      </div>
      <strong>{product.price}</strong>

      <footer>
        <small>
          Qty: {product.quantity}
        </small>
        <button onClick={() => addToCart(product)}>
          +
        </button>
        <button onClick={() => deleteProduct(product)}>
          🗑️
        </button>
      </footer>
    </li>
  ))

  return (
    <>
      <label htmlFor={cartCheckboxId} className='cart-button'>
        <CartIcon />
      </label>
      <input type='checkbox' id={cartCheckboxId} hidden />

      <aside className='cart'>
        {totalPrice}
        <ul>
          {cartList}
        </ul>
        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}
