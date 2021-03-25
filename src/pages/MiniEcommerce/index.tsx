import { FormEvent, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { CheckOut } from '../../components/CheckOut'
import { Menu } from '../../components/Menu'
import { NavBar } from '../../components/NavBar'
import { Products } from '../../components/ProductsList/Products'
import { Dashboard } from '../Dashboard'
import { Footer } from '../Footer'
import { Orders } from '../Orders'
import { Register } from '../Register'
export type ProductsPropsTypePrice = {
  id?: number
  title: string
  price: string
}
const MiniEcommerce = () => {
  const [cart, setCart] = useState({ products: [] })
  const [showProducts, setShowProducts] = useState(true)
  const [showCheckOut, setShowCheckOut] = useState(true)
  const [total, setTotal] = useState('0,00')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const addProduct = (product: ProductsPropsTypePrice) => {
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
  const handleListItemClick = (event: FormEvent, index: number) => {
    setSelectedIndex(index)
  }

  const handleShowProducts = () => {
    setShowCheckOut(false)
    setShowProducts(true)
  }

  const handleShowCheckout = (total: string) => {
    setShowCheckOut(true)
    setShowProducts(false)
    setTotal(total)
  }

  return (
    <Container fluid>
      <Row xs={12}>
        <Col>
          <Menu
            products={cart.products}
            handleShowProducts={handleShowProducts}
            handleShowCheckout={handleShowCheckout}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={2}>
          <NavBar
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
          />
        </Col>
        <Col xs={10}>
          <Products visivel={showProducts} addProduct={addProduct} />

          <CheckOut />
        </Col>
      </Row>

      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  )
}

export { MiniEcommerce }
