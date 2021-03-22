import React from 'react'
import ReactDom from 'react-dom'
import { TaskList } from '.'
import { fireEvent, render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'
import { Task } from '../../models/task.model'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <TaskList />
    </Router>
  )
  return {
    history
  }
}

describe('Test TaskList', () => {
  const nameFirstTask = 'First Tarefa'
  const nameSecondTask = 'Second Tarefa'
  const namethreeTask = 'Three Tarefa'

  beforeEach(() => {
    localStorage['task'] = JSON.stringify([
      new Task(1, nameFirstTask, false),
      new Task(2, nameSecondTask, false),
      new Task(3, namethreeTask, false)
    ])
  })

  afterEach(() => {
    delete localStorage['task']
  })
  it('deve renderizar componente sem erro', () => {
    const div = document.createElement('div')
    makeSut()
    ReactDom.unmountComponentAtNode(div)
  })

  it('deve renderizar 3 tarefas', () => {
    makeSut()
    const table = screen.getByTestId('table')
    expect(table).toHaveTextContent(nameFirstTask)
    expect(table).toHaveTextContent(nameSecondTask)
    expect(table).toHaveTextContent(namethreeTask)
  })

  it('deve filtrar os dados de takss', () => {
    makeSut()
    fireEvent.change(screen.getByTestId('txt-tarefa'), {
      target: { value: nameFirstTask }
    })
    const table = screen.getByTestId('table')
    expect(table).toHaveTextContent(nameFirstTask)
    expect(table).not.toHaveTextContent(nameSecondTask)
    expect(table).not.toHaveTextContent(namethreeTask)
  })
})
