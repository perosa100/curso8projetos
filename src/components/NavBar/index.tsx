import { FormEvent } from 'react'
import { ListGroup } from 'react-bootstrap'

type NavBarProps = {
  selectedIndex: number
  handleListItemClick: (event: FormEvent, index: number) => void
}

const NavBar = ({ selectedIndex, handleListItemClick }: NavBarProps) => {
  return (
    <div>
      <ListGroup
        defaultActiveKey="#link1"
        variant="flush"
        style={{ marginTop: '10px' }}
      >
        <ListGroup.Item
          action
          href="home"
          onClick={(event) => handleListItemClick(event, 0)}
        >
          Resumo
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="orders"
          onClick={(event) => handleListItemClick(event, 1)}
        >
          Pedidos
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="registerproducts"
          onClick={(event) => handleListItemClick(event, 2)}
        >
          Cadastros
        </ListGroup.Item>

        <ListGroup.Item
          action
          href="dashboard"
          onClick={(event) => handleListItemClick(event, 3)}
        >
          Relatórios
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export { NavBar }
