import { ProductsList } from '..'
import { Alert } from 'react-bootstrap'
import { useState } from 'react'
import './styles.css'

type ProductsProps = {
  addProduct: (args: string) => void
  visivel: boolean
}

const Products = ({ addProduct, visivel }: ProductsProps) => {
  const [showMsg, setShowMsg] = useState(false)
  const [product, setProduct] = useState('')
  const visible = () => {
    return visivel ? null : 'hidden'
  }

  const showMessage = (product: string) => {
    setShowMsg(true)
    setProduct(product)
    setTimeout(() => {
      setShowMsg(false)
    }, 3000)
  }
  return (
    <div className={visible()}>
      <Alert variant="success" style={{ margin: '10px' }} show={showMsg}>
        <b>{product}</b> adicionado com sucesso ao carrinho!!!
      </Alert>
      <ProductsList addProduct={addProduct} showMessage={showMessage} />
    </div>
  )
}

export { Products }
