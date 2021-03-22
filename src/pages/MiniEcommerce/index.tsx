import { useState } from 'react'
import { CheckOut } from '../../components/CheckOut'
import { Menu } from '../../components/Menu'
import { Products } from '../../components/ProductsList/Products'

const MiniEcommerce = () => {
  const [cart, setCart] = useState({ products: [] })
  const [showProducts, setShowProducts] = useState(true)
  const [showCheckOut, setShowCheckOut] = useState(true)
  const [total, setTotal] = useState('0,00')

  const addProduct = (product: any) => {
    const objCart = Object.assign({}, cart)
    let novoProduct = true

    objCart.products.forEach((prod, indice) => {
      if (prod.title === product.title) {
        objCart.products[indice].quantidade++
        novoProduct = false
      }
    })
    if (novoProduct) {
      objCart.products.push({
        title: product.title,
        price: product.price,
        quantidade: 1
      })
    }

    setCart(objCart)
  }

  return (
    <div>
      <Menu />
      <Products visivel={showProducts} addProduct={addProduct} />
      <CheckOut />
    </div>
  )
}

export { MiniEcommerce }
