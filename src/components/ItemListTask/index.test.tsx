import React from 'react'
import ReactDom from 'react-dom'
import { ItemListTask } from '.'
import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'
import { Task } from '../../models/task.model'

type SutTypes = {
  history: MemoryHistory
}

const nameTaks = 'Task'
const task = new Task(new Date().getTime(), nameTaks, false)
const taskDone = new Task(new Date().getTime(), nameTaks, true)

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <table>
        <tbody>
          <ItemListTask tasks={[taskDone]} LoadingTasks={() => false} />
        </tbody>
      </table>
    </Router>
  )
  return {
    history
  }
}

describe.skip('Test ItemListTask', () => {
  it('deve renderizar componente sem erro', () => {
    const div = document.createElement('div')
    makeSut()
    ReactDom.unmountComponentAtNode(div)
  })

  it('deve exibir uma tarefa', () => {
    makeSut()
    expect(screen.getByTestId('tarefa')).toHaveTextContent(nameTaks)
  })

  it('deve exibir uma tarefa concluida', () => {
    makeSut()
    expect(screen.getByTestId('nome-tarefa')).toHaveStyle(
      'text-decoration: line-through'
    )
  })
})
