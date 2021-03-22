import React from 'react'
import ReactDom from 'react-dom'
import { Ordenation } from '.'
import { render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (orderAsc: boolean, orderDesc: boolean): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <Ordenation orderAsc={orderAsc} orderDesc={orderDesc} />
    </Router>
  )
  return {
    history
  }
}

describe('Test Ordenation', () => {
  it('deve renderizar componente sem erro', () => {
    const div = document.createElement('div')
    makeSut(false, false)
    ReactDom.unmountComponentAtNode(div)
  })

  it('deve exibir renderizacao padrao', () => {
    makeSut(false, false)
    expect(screen.getByTestId('faSort')).not.toHaveClass('hidden')
    expect(screen.getByTestId('faSortUp')).toHaveClass('hidden')
    expect(screen.getByTestId('faSortDown')).toHaveClass('hidden')
  })

  it('deve exibir renderizacao ascendente', () => {
    makeSut(true, false)
    expect(screen.getByTestId('faSort')).toHaveClass('hidden')
    expect(screen.getByTestId('faSortUp')).not.toHaveClass('hidden')
    expect(screen.getByTestId('faSortDown')).toHaveClass('hidden')
  })

  it('deve exibir renderizacao descentende', () => {
    makeSut(false, true)
    expect(screen.getByTestId('faSort')).toHaveClass('hidden')
    expect(screen.getByTestId('faSortUp')).toHaveClass('hidden')
    expect(screen.getByTestId('faSortDown')).not.toHaveClass('hidden')
  })
})
