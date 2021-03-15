import React from 'react'
import ReactDom from 'react-dom'
import { ListCoins } from '.'
import '@testing-library/jest-dom/extend-expect'

describe('Test CurrencyConverter', () => {
  it('deve renderizar componente sem erro', () => {
    const div = document.createElement('div')
    ReactDom.render(<ListCoins />, div)
    ReactDom.unmountComponentAtNode(div)
  })
})
