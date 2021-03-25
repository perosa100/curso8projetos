import { NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSadTear } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { productProps } from '..'

type MenuProps = {
  products: productProps[]
}

const ItensCar = ({ products }: MenuProps) => {
  const [showMsg, setShowMsg] = useState(false)
  const [product, setProduct] = useState('')

  const render = () => {
    if (products.length === 0) {
      return (
        <NavDropdown.Item href="">
          <FontAwesomeIcon icon={faSadTear} />
          &nbsp; Carrinho Vazio
        </NavDropdown.Item>
      )
    }
    const itens = products.map((product) => (
      <NavDropdown.Item key={product.title}>
        {product.title} - {product.quantidade} - {product.price}
      </NavDropdown.Item>
    ))

    return itens
  }
  return <div> {render()}</div>
}

export { ItensCar }
