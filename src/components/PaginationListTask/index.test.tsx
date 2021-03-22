import React from 'react'
import ReactDom from 'react-dom'
import { PaginationListTask } from '.'
import { render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <PaginationListTask
        totalPages={30}
        itemsForPage={10}
        pageActual={1}
        changePage={() => false}
      />
    </Router>
  )
  return {
    history
  }
}

describe('Test PaginationListTask', () => {
  it('deve renderizar componente sem erro', () => {
    const div = document.createElement('div')
    makeSut()
    ReactDom.unmountComponentAtNode(div)
  })

  it('deve exibir uma paginacao contendo 3 paginas', () => {
    makeSut()
    const pagination = screen.getByTestId('paginacao')
    expect(pagination).toHaveTextContent('1')
    expect(pagination).toHaveTextContent('2')
    expect(pagination).toHaveTextContent('3')
  })
})
