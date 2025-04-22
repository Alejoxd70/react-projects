import { useCart } from '../hooks/useCart.js'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'
import './Products.css'

export const Products = ({ products }) => {
  const { addToCart, checkProductInCart, deleteProduct } = useCart()
  return (
    <>
      <main className='products'>
        <ul>
          {products.map(product => {
            const isProductInCart = checkProductInCart(product)
            return (
              <li key={product.id}>
                <img src={product.thumbnail} alt={product.title + ' image'} />
                <h2>{product.title} - ${product.price}</h2>
                <button onClick={() => isProductInCart ? deleteProduct(product) : addToCart(product)}>
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </li>
            )
          })}
        </ul>
      </main>
    </>

  )
}
