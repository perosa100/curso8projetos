import { Card, Button } from 'react-bootstrap'
import {} from 'react-bootstrap'
import api from '../../api/api'
import { useEffect, useState } from 'react'
import { ProductsPropsTypePrice } from '../../pages/MiniEcommerce'

export type ProductsPropsType = {
  id: number
  title: string
  price: string
  description: string
  category: string
  image: string
}

type ProductsListProps = {
  addProduct: (args: ProductsPropsTypePrice) => void
  showMessage: (args: string) => void
}

const ProductsList = ({ addProduct, showMessage }: ProductsListProps) => {
  const [products, setproducts] = useState<ProductsPropsType[]>([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsList = await api.get('/mini-ecommerces/products')
        setproducts(productsList.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
  }, [])

  const handleBuy = (
    event: React.MouseEvent<HTMLElement>,
    product: ProductsPropsType
  ) => {
    event.preventDefault()
    addProduct(product)
    showMessage(product.title)
  }

  const render = () => {
    const cards = products.map((product) => (
      <Card
        style={{ width: '18rem', margin: '10px', float: 'left' }}
        key={product.id}
      >
        <Card.Img
          variant="top"
          src={product.image}
          style={{ width: '200px', height: '150px' }}
        />
        <Card.Body className="text-center">
          <Card.Title style={{ height: '40px' }}>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Button
            variant="success"
            style={{ width: '100%' }}
            onClick={(event) => {
              handleBuy(event, product)
            }}
          >
            Comprar {`(R$ ${product.price})`}
          </Button>
        </Card.Body>
      </Card>
    ))
    return cards
  }
  return <div>{render()}</div>
}

export { ProductsList }
