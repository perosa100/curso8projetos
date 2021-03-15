import React from 'react'
import ReactDom from 'react-dom'
import { TaskRegister } from '.'
import { render, fireEvent, screen } from '@testing-library/react'
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
      <TaskRegister />
    </Router>
  )
  return {
    history
  }
}

describe('Test CurrencyConverter', () => {
  it('deve renderizar componente sem erro', () => {
    const div = document.createElement('div')
    makeSut()
    ReactDom.unmountComponentAtNode(div)
  })

  it('deve cadastrar uma nova tarefa', () => {
    makeSut()
    fireEvent.change(screen.getByTestId('txt-tarefa'), {
      target: { value: 'Testar Componente' }
    })
    fireEvent.click(screen.getByTestId('btn-cadastrar'))

    expect(screen.getByTestId('modal')).toHaveTextContent('Sucesso')

    expect(screen.getByTestId('modal')).toHaveTextContent(
      'Tarefa Adicionada com Sucesso!!!'
    )
  })
})
