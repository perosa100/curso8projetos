import { Card, Button } from 'react-bootstrap'
import {} from 'react-bootstrap'
import api from '../../api/api'
import { useEffect, useState } from 'react'

export type ProductsPropsType = {
  id: number
  title: string
  price: string
  description: string
  category: string
  image: string
}

type ProductsListProps = {
  addProduct: (arg: string) => void
  showMessage: (arg: string) => void
}

const ProductsList = ({ addProduct, showMessage }: ProductsListProps) => {
  const [products, setproducts] = useState<ProductsPropsType[]>([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsList = await api.get('/mini-ecommerces/products')
        setproducts(productsList.data)
        console.log(productsList.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
  }, [])

  const handleBuy = (event: React.MouseEvent<HTMLElement>, product: string) => {
    event.preventDefault()
    addProduct(product)
    showMessage(product)
  }

  const render = () => {
    const cards = products.map((product) => (
      <Card
        style={{ width: '18rem', margin: '10px', float: 'left' }}
        key={product.id}
      >
        <Card.Img variant="top" src={product.image} />
        <Card.Body className="text-center">
          <Card.Title style={{ height: '40px' }}>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Button
            variant="success"
            style={{ width: '100%' }}
            onClick={(event) => {
              handleBuy(event, product.title)
            }}
          >
            Comprar
          </Button>
        </Card.Body>
      </Card>
    ))
    return cards
  }
  return <div>{render()}</div>
}

export { ProductsList }