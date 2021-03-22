import React from 'react'
import ReactDom from 'react-dom'
import { DeleteTask } from '.'
import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'
import { Task } from '../../models/task.model'

type SutTypes = {
  history: MemoryHistory
}

const nameTaks = 'Task'
const taskDone = new Task(new Date().getTime(), nameTaks, true)

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <DeleteTask tasks={taskDone} LoadingTasks={() => false} />
    </Router>
  )
  return {
    history
  }
}

describe.skip('Test DeleteTask', () => {
  it('deve renderizar componente sem erro', () => {
    const div = document.createElement('div')
    makeSut()
    ReactDom.unmountComponentAtNode(div)
  })

  it('deve renderizar o modal', () => {
    makeSut()
    fireEvent.click(screen.getByTestId('btn-abrir-modal'))
    expect(screen.getByTestId('modal')).toHaveTextContent(nameTaks)
  })

  it('deve deletar uma tarefa', () => {
    localStorage['task'] = JSON.stringify([taskDone])
    makeSut()
    fireEvent.click(screen.getByTestId('btn-abrir-modal'))
    fireEvent.click(screen.getByTestId('btn-remover'))
    const taskDb = JSON.parse(localStorage['task'])

    expect(taskDb.length).toBe(0)
  })
})
