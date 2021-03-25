import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShoppingBasket,
  faCashRegister,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons'
import { ItensCar } from './ItensCar'

export type productProps = {
  title: string
  price: string
  quantidade: number
}
type MenuProps = {
  products: productProps[]
  handleShowProducts: () => void
  handleShowCheckout: (arg: string) => void
}
const Menu = ({
  products,
  handleShowProducts,
  handleShowCheckout
}: MenuProps) => {
  const calcTotal = () => {
    if (products.length === 0) {
      return '0.00'
    }
    let total = 0
    console.log(products, 'products')

    products.forEach((product) => {
      console.log(product.price, 'product.price')

      let price = product.price.replace(',', '.').replace('R$ ', '')
      total += parseFloat(price) * product.quantidade
    })
    return total.toFixed(2).toString().replace('.', ',')
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="">Mini Ecommerce</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <NavDropdown
            id="center"
            title={
              <div style={{ display: 'inline-block' }}>
                <FontAwesomeIcon icon={faShoppingCart} />
                &nbsp; Carrinho
              </div>
            }
            drop="left"
          >
            <NavDropdown.Item href="" onClick={handleShowProducts}>
              <FontAwesomeIcon icon={faShoppingBasket} />
              &nbsp;
              <strong>Produtos</strong>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <ItensCar products={products} />

            <NavDropdown.Divider />
            <NavDropdown.Item href="" disabled>
              <strong>Total: R$ {calcTotal()}</strong>
            </NavDropdown.Item>

            <span className={products.length === 0 ? 'hidden' : null}>
              {/* verifica se tem producot */}
              <NavDropdown.Divider />

              <NavDropdown.Item
                href=""
                style={{ color: 'green' }}
                onClick={() => handleShowCheckout(calcTotal())}
              >
                <FontAwesomeIcon icon={faCashRegister} />
                &nbsp; Finalizar compra
              </NavDropdown.Item>
            </span>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export { Menu }
