import React from 'react'
import ReactDom from 'react-dom'
import { ItemListTask } from '.'
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
      <ItemListTask tasks={[]} LoadingTasks={() => false} />
    </Router>
  )
  return {
    history
  }
}

describe('Test ItemListTask', () => {
  it('deve renderizar componente sem erro', () => {
    const div = document.createElement('div')
    makeSut()
    ReactDom.unmountComponentAtNode(div)
  })
})
