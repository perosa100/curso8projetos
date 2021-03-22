import React from 'react'
import ReactDom from 'react-dom'
import { DoneTask } from '.'
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
      <DoneTask
        tasks={taskDone}
        LoadingTasks={() => false}
        className={task.done ? 'hidden' : null}
      />
    </Router>
  )
  return {
    history
  }
}

describe.skip('Test DoneTask', () => {
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

  it('deve concluir uma tarefa', () => {
    localStorage['task'] = JSON.stringify([taskDone])
    makeSut()
    fireEvent.click(screen.getByTestId('btn-abrir-modal'))
    fireEvent.click(screen.getByTestId('btn-concluir'))
    const taskDb = JSON.parse(localStorage['task'])

    expect(taskDb[0].done).toBeTruthy()
  })
})
