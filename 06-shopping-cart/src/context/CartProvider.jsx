import { createContext, useState, useMemo } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const totalPrice = useMemo(() => {
    let totalPrice = 0
    cart.forEach(product => {
      totalPrice += product.price
    })

    console.log(totalPrice)
    return parseFloat(totalPrice).toFixed(2)
  }, [cart])

  const checkProductInCart = productToCheck => {
    return cart.some(product => product.id === productToCheck.id)
  }

  const addToCart = product => {
    const productInCart = cart.findIndex(item => item.id === product.id)

    if (productInCart >= 0) {
      const newCart = structuredClone(cart)
      newCart[productInCart].quantity += 1
      newCart[productInCart].price += newCart[productInCart].price
      setCart(newCart)
      return
    }

    setCart(prev => [...prev, { ...product, quantity: 1 }])
  }

  const clearCart = () => {
    setCart([])
  }

  const deleteProduct = productToDelete => {
    const newCart = cart.filter(product => {
      return product.id !== productToDelete.id
    })
    setCart(newCart)
  }

  return (
    <CartContext.Provider value={{
      cart,
      clearCart,
      addToCart,
      deleteProduct,
      totalPrice,
      checkProductInCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
