import { Products } from './Components/Products'
// import { products } from './mocks/products.json'
import './style.css'
import { Header } from './Components/Header'
import { useProducts } from './hooks/useProducts'
import { Footer } from './Components/Footer'
import { Cart } from './Components/Cart'
import { CartProvider } from './context/CartProvider'

export const App = () => {
  const { filteredProducts } = useProducts()
  return (
    <>
      <Header />
      <CartProvider>
        <Cart />
        <Products products={filteredProducts} />
        <Footer />
      </CartProvider>
    </>
  )
}
