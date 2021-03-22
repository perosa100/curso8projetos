import React from 'react'
import ReactDom from 'react-dom'
import { TaskUpdate } from '.'
import { render } from '@testing-library/react'
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
      <TaskUpdate />
    </Router>
  )
  return {
    history
  }
}

describe.skip('Test TaskUpdate', () => {
  it('deve renderizar componente sem erro', () => {
    const div = document.createElement('div')
  })
})
